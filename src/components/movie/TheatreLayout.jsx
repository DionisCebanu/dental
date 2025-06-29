import React, { useContext } from 'react';
    import { motion } from 'framer-motion';
    import { Armchair } from 'lucide-react';
    import { LanguageContext } from '@/context/LanguageContext';

    const seatTypes = {
      standard: { price: 12, color: 'bg-blue-500', hoverColor: 'hover:bg-blue-400', selectedColor: 'bg-green-500' },
      premium: { price: 18, color: 'bg-yellow-500', hoverColor: 'hover:bg-yellow-400', selectedColor: 'bg-green-600' },
      booked: { color: 'bg-slate-600', hoverColor: 'cursor-not-allowed', selectedColor: '' },
    };
    
    const Seat = ({ id, type, status, onSeatSelect, isSelected }) => {
      const seatConfig = seatTypes[type] || seatTypes.standard;
      const currentStatus = status === 'booked' ? 'booked' : (isSelected ? 'selected' : 'available');
      
      let seatClasses = `w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-t-md flex items-center justify-center transition-all duration-150 ease-in-out transform hover:scale-110`;
      
      if (currentStatus === 'booked') {
        seatClasses += ` ${seatTypes.booked.color} ${seatTypes.booked.hoverColor} opacity-70`;
      } else if (currentStatus === 'selected') {
        seatClasses += ` ${seatConfig.selectedColor} text-white shadow-lg ring-2 ring-white`;
      } else { // available
        seatClasses += ` ${seatConfig.color} ${seatConfig.hoverColor} cursor-pointer text-white/80`;
      }

      return (
        <motion.div
          className={seatClasses}
          onClick={() => status !== 'booked' && onSeatSelect(id, type)}
          whileTap={status !== 'booked' ? { scale: 0.9 } : {}}
          title={`${type.charAt(0).toUpperCase() + type.slice(1)} Seat - ${status === 'booked' ? 'Booked' : (isSelected ? 'Selected' : 'Available')}`}
        >
          <Armchair size={16} />
        </motion.div>
      );
    };

    const TheatreLayout = ({ onSeatSelect, selectedSeats, bookedSeats }) => {
      const { t } = useContext(LanguageContext);
      const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      const seatsPerRow = 12;
      const premiumRows = ['G', 'H']; 

      const generateSeats = () => {
        let seats = [];
        rows.forEach(row => {
          for (let i = 1; i <= seatsPerRow; i++) {
            const seatId = `${row}${i}`;
            const type = premiumRows.includes(row) ? 'premium' : 'standard';
            const status = bookedSeats.includes(seatId) ? 'booked' : 'available';
            seats.push({ id: seatId, row, number: i, type, status });
          }
        });
        return seats;
      };

      const allSeats = generateSeats();

      return (
        <div className="flex flex-col items-center p-2 sm:p-4 bg-slate-900/50 rounded-lg border border-slate-700">
          <div className="w-full max-w-md h-10 sm:h-12 bg-gradient-to-b from-gray-400 to-gray-300 rounded-t-full mb-8 sm:mb-12 flex items-center justify-center text-slate-800 font-semibold shadow-inner">
            {t('screen')}
          </div>
          
          <div className="space-y-2 sm:space-y-3 w-full max-w-xl">
            {rows.map(row => (
              <div key={row} className="flex justify-center items-center space-x-1 sm:space-x-1.5">
                <span className="w-6 text-center text-xs text-gray-400 mr-1 sm:mr-2">{row}</span>
                {allSeats.filter(seat => seat.row === row).map((seat, index) => (
                  <React.Fragment key={seat.id}>
                    {(index === 2 || index === seatsPerRow - 3) && <div className="w-4 sm:w-6"></div>} 
                    <Seat
                      id={seat.id}
                      type={seat.type}
                      status={seat.status}
                      onSeatSelect={onSeatSelect}
                      isSelected={selectedSeats.includes(seat.id)}
                    />
                  </React.Fragment>
                ))}
                 <span className="w-6 text-center text-xs text-gray-400 ml-1 sm:ml-2">{row}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-gray-300">
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-t-md mr-1.5 ${seatTypes.standard.color}`}></div>{t('seatStatusAvailable')} ({t('seatPriceStandard')})
            </div>
             <div className="flex items-center">
              <div className={`w-4 h-4 rounded-t-md mr-1.5 ${seatTypes.premium.color}`}></div>{t('seatStatusAvailable')} ({t('seatPricePremium')})
            </div>
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-t-md mr-1.5 ${seatTypes.standard.selectedColor}`}></div>{t('seatStatusSelected')}
            </div>
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-t-md mr-1.5 ${seatTypes.booked.color} opacity-70`}></div>{t('seatStatusBooked')}
            </div>
          </div>
        </div>
      );
    };

    export default TheatreLayout;