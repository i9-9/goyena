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
        <div className="w-full h-px bg-[#2C3424]/20 my-10 md:my-12"></div>
        
        {/* Sección Proyecto */}
        <Project />
      </div>
    </div>
  );
};

export default ProjectLocation; 