'use client';

import Location from './Location';
import Project from './Project';

const ProjectLocation = () => {
  return (
    <div className="relative bg-[#D7DBD6]">
      {/* Contenido */}
      <div className="relative z-10">
        {/* Sección Ubicación */}
        <Location />
        
        {/* Línea separadora */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="w-full h-px bg-[#2C3424]/30 my-12 md:my-16"></div>
        </div>
        
        {/* Sección Proyecto */}
        <Project />
      </div>
    </div>
  );
};

export default ProjectLocation; 