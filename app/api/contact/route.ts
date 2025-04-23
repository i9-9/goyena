import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const formData = await request.json();
    
    // Validate required fields
    if (!formData.nombre || !formData.apellido || !formData.email) {
      return NextResponse.json(
        { error: 'Nombre, apellido y email son campos requeridos' },
        { status: 400 }
      );
    }

    // Google Sheets Authentication
    // These credentials should be stored in environment variables
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    
    // Handle private key correctly - important for Vercel deployment
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    if (privateKey) {
      // Replace literal \n with actual newlines if needed
      privateKey = privateKey.replace(/\\n/g, '\n');
      
      // If key is wrapped in quotes (as it is in Vercel), remove them
      if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
        privateKey = privateKey.slice(1, -1);
      }
    }
    
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
    
    if (!serviceAccountEmail || !privateKey || !spreadsheetId) {
      console.error('Google Sheets credentials missing');
      return NextResponse.json(
        { error: 'Error de configuración del servidor' },
        { status: 500 }
      );
    }
    
    // Set up JWT auth
    const jwt = new JWT({
      email: serviceAccountEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Create a new document instance
    const doc = new GoogleSpreadsheet(spreadsheetId, jwt);
    
    // Load the document
    await doc.loadInfo();
    
    // Get the first sheet or create it if it doesn't exist
    let sheet = doc.sheetsByIndex[0];
    if (!sheet) {
      sheet = await doc.addSheet({ 
        title: 'Contactos',
        headerValues: ['Fecha', 'Nombre', 'Apellido', 'Teléfono', 'Email', 'Búsqueda', 'Mensaje']
      });
    }
    
    // Add a row to the sheet
    await sheet.addRow({
      Fecha: new Date().toLocaleString('es-AR'),
      Nombre: formData.nombre,
      Apellido: formData.apellido,
      Teléfono: formData.telefono || 'No proporcionado',
      Email: formData.email,
      Búsqueda: formData.busqueda || 'No especificado',
      Mensaje: formData.mensaje || 'Sin mensaje'
    });
    
    // Return success response
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Error submitting form to Google Sheets:', error);
    
    return NextResponse.json(
      { error: 'Error al procesar el formulario' },
      { status: 500 }
    );
  }
} 