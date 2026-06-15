import React, { useState } from 'react';

export default function AgeCalculator() {
  const [dob, setDob] = useState<string>('');
  const [targetDate, setTargetDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const calculateAge = () => {
    if (!dob) return null;
    
    const birthDate = new Date(dob);
    const toDate = targetDate ? new Date(targetDate) : new Date();
    
    if (birthDate > toDate) return null;

    let years = toDate.getFullYear() - birthDate.getFullYear();
    let months = toDate.getMonth() - birthDate.getMonth();
    let days = toDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      // Get days in previous month
      const prevMonth = new Date(toDate.getFullYear(), toDate.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const timeDiff = toDate.getTime() - birthDate.getTime();
    const totalDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    
    return { years, months, days, totalDays };
  };

  const age = calculateAge();

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Date of Birth</label>
          <input
            type="date"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-lg"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Calculate age at</label>
          <input
            type="date"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-lg"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
          />
        </div>
      </div>

      {age ? (
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8 text-center shadow-sm">
           <h3 className="text-sm font-bold text-indigo-800 uppercase tracking-widest mb-4">Your exact age is</h3>
           <div className="flex justify-center gap-4 text-indigo-900 mb-6">
              <div className="flex flex-col items-center">
                 <span className="text-5xl font-extrabold">{age.years}</span>
                 <span className="text-sm font-medium mt-1">Years</span>
              </div>
              <div className="text-4xl font-light opacity-50 mt-1">,</div>
              <div className="flex flex-col items-center">
                 <span className="text-5xl font-extrabold">{age.months}</span>
                 <span className="text-sm font-medium mt-1">Months</span>
              </div>
              <div className="text-4xl font-light opacity-50 mt-1">,</div>
              <div className="flex flex-col items-center">
                 <span className="text-5xl font-extrabold">{age.days}</span>
                 <span className="text-sm font-medium mt-1">Days</span>
              </div>
           </div>
           
           <div className="pt-6 border-t border-indigo-200/60 inline-block mx-auto min-w-[200px]">
             <div className="text-slate-600">Total days old</div>
             <div className="text-2xl font-bold text-indigo-900">{age.totalDays.toLocaleString()} days</div>
           </div>
        </div>
      ) : dob ? (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-center">
          The calculate-at date must be after the date of birth.
        </div>
      ) : null}
    </div>
  );
}
