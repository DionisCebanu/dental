import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { Armchair, Users, XCircle, AlertTriangle } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';

    const Table = ({ table, onTableSelect, isSelected, guestCount, formCriteriaSet }) => {
      const { id, capacity, type, position, status } = table;
      const isActuallyBooked = status === 'booked';
      
      // isTooSmall is only relevant if guestCount is specified (formCriteriaSet is true)
      const isTooSmall = formCriteriaSet && guestCount > 0 && capacity < guestCount;
      
      // A table is effectively disabled if it's booked, or if criteria are set and it's too small.
      const isEffectivelyDisabled = isActuallyBooked || isTooSmall;


      let tableClasses = "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-in-out flex flex-col items-center justify-center p-1 rounded-lg shadow-md";
      let chairClasses = "bg-slate-500 rounded-sm";
      let tableBodyClasses = "bg-slate-600 rounded-md flex items-center justify-center";
      
      if (isSelected && !isActuallyBooked && !isTooSmall && formCriteriaSet) {
        tableClasses += " ring-4 ring-accent scale-110 z-10";
        tableBodyClasses = "bg-accent rounded-md flex items-center justify-center";
        chairClasses = "bg-slate-300 rounded-sm";
      } else if (isActuallyBooked) {
        tableClasses += " bg-red-800/80 cursor-not-allowed opacity-70";
        tableBodyClasses = "bg-red-600/60 rounded-md flex items-center justify-center";
        chairClasses = "bg-red-400/70 rounded-sm";
      } else if (isTooSmall) {
        tableClasses += " bg-yellow-700/60 cursor-not-allowed opacity-60"; // Different color for too small
        tableBodyClasses = "bg-yellow-500/50 rounded-md flex items-center justify-center";
      } else {
        tableClasses += " bg-slate-700 hover:bg-slate-600 cursor-pointer hover:shadow-lg";
      }

      // General disabled appearance if criteria are not yet set, but allow hover for visual feedback
      if (!formCriteriaSet && !isSelected) {
         tableClasses += " opacity-80"; // Slightly less opaque than fully disabled
      }


      const renderChairs = () => {
        const chairs = [];
        const chairSize = "w-3 h-4 sm:w-4 sm:h-5";
        
        if (type === '2-seater') {
          chairs.push(<div key={`${id}-c1`} className={`${chairClasses} ${chairSize} absolute -top-3 left-1/2 -translate-x-1/2`}></div>);
          chairs.push(<div key={`${id}-c2`} className={`${chairClasses} ${chairSize} absolute -bottom-3 left-1/2 -translate-x-1/2`}></div>);
        } else if (type === '4-seater') {
          chairs.push(<div key={`${id}-c1`} className={`${chairClasses} ${chairSize} absolute -top-3 left-1/2 -translate-x-1/2`}></div>);
          chairs.push(<div key={`${id}-c2`} className={`${chairClasses} ${chairSize} absolute -bottom-3 left-1/2 -translate-x-1/2`}></div>);
          chairs.push(<div key={`${id}-c3`} className={`${chairClasses} ${chairSize} rotate-90 absolute -left-3 top-1/2 -translate-y-1/2`}></div>);
          chairs.push(<div key={`${id}-c4`} className={`${chairClasses} ${chairSize} rotate-90 absolute -right-3 top-1/2 -translate-y-1/2`}></div>);
        } else if (type === '6-seater-round') {
          for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * 2 * Math.PI;
            const radius = type === '6-seater-round' ? 28 : 35; 
            const x = Math.cos(angle) * radius; 
            const y = Math.sin(angle) * radius;
            chairs.push(<div key={`${id}-c${i}`} className={`${chairClasses} ${chairSize}`} style={{ position: 'absolute', top: `calc(50% + ${y}px - 0.5rem)`, left: `calc(50% + ${x}px - 0.375rem)`}}></div>);
          }
        } else if (type === 'booth') {
           chairs.push(<div key={`${id}-booth`} className={`${chairClasses} w-full h-3 absolute -top-2 left-0 rounded-t-md`}></div>);
           chairs.push(<div key={`${id}-c1`} className={`${chairClasses} ${chairSize} absolute -bottom-3 left-1/4 -translate-x-1/2`}></div>);
           chairs.push(<div key={`${id}-c2`} className={`${chairClasses} ${chairSize} absolute -bottom-3 right-1/4 translate-x-1/2`}></div>);
        }
        return chairs;
      };
      
      let tableShapeStyles = {};
      if (type === '2-seater') tableShapeStyles = { width: '40px', height: '30px' };
      else if (type === '4-seater') tableShapeStyles = { width: '50px', height: '50px' };
      else if (type === '6-seater-round') tableShapeStyles = { width: '50px', height: '50px', borderRadius: '50%'};
      else if (type === 'booth') tableShapeStyles = { width: '70px', height: '35px'};


      return (
        <motion.div
          layout
          style={{ top: position.y, left: position.x, ...tableShapeStyles }}
          className={tableClasses}
          onClick={() => onTableSelect(table)} // Click logic handled in parent based on overall state
          whileHover={!isEffectivelyDisabled ? { scale: 1.1, zIndex: 10, boxShadow: "0px 0px 15px rgba(250, 176, 5, 0.5)" } : {}}
          whileTap={!isEffectivelyDisabled ? { scale: 0.95 } : {}}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: Math.random() * 0.3 }}
        >
          <div className={`${tableBodyClasses} w-full h-full relative`} style={ type === '6-seater-round' ? {borderRadius: '50%'} : {}}>
            {renderChairs()}
            <div className="relative z-10 flex flex-col items-center text-white text-xs sm:text-sm">
              {isActuallyBooked ? (
                <XCircle size={type === 'booth' || type === '6-seater-round' ? 16 : 14} className="mb-0.5 text-red-300"/>
              ) : isTooSmall ? (
                <AlertTriangle size={type === 'booth' || type === '6-seater-round' ? 16 : 14} className="mb-0.5 text-yellow-300"/>
              ) : (
                <Armchair size={type === 'booth' || type === '6-seater-round' ? 16 : 14} className="mb-0.5"/>
              )}
              <span className={isActuallyBooked ? 'text-red-200' : isTooSmall ? 'text-yellow-200' : ''}>{capacity}</span>
            </div>
          </div>
        </motion.div>
      );
    };

    const TableLayout = ({ tables, onTableSelect, selectedTableId, guestCount, disabled }) => {
      const { t } = useContext(LanguageContext);
      const formCriteriaSet = guestCount > 0; // A simple check if guest count is entered
      
      return (
        <div className={`relative w-full min-h-[320px] h-80 sm:h-96 md:h-[450px] bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-700 overflow-hidden p-4 shadow-inner shadow-black/30`}>
          {disabled && ( // This 'disabled' prop from parent BookingPage can still be used for an overlay if truly needed
             <div className="absolute inset-0 bg-slate-800/90 backdrop-blur-sm flex items-center justify-center z-20 rounded-lg">
                <motion.p 
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    className="text-accent text-lg font-semibold text-center px-4"
                >
                    {t('tableLayoutDisabledPrompt')}
                </motion.p>
            </div>
          )}
          {tables.map(table => (
            <Table 
              key={table.id} 
              table={table} 
              onTableSelect={onTableSelect}
              isSelected={selectedTableId === table.id}
              guestCount={guestCount}
              formCriteriaSet={formCriteriaSet} // Pass this down
            />
          ))}
          <div className="absolute top-2 left-2 bg-primary/20 px-3 py-1 rounded-full text-xs font-medium text-primary-foreground shadow">{t('tableLayoutEntrance')}</div>
          <div className="absolute bottom-2 right-2 bg-slate-800/60 px-3 py-1 rounded-full text-xs font-medium text-gray-300 flex items-center shadow">
            <Users size={12} className="mr-1.5 text-accent"/> {t('tableLayoutCapacity')}
          </div>
        </div>
      );
    };

    export default TableLayout;