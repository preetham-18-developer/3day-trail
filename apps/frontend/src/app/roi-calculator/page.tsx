"use client";

import React, { useState } from 'react';
import { Calculator, Clock, Lightbulb, TrendingUp } from 'lucide-react';

export default function ROICalculator() {
  const [fees, setFees] = useState<number>(1500000);
  const [salary, setSalary] = useState<number>(800000);
  const [growthRate, setGrowthRate] = useState<number>(10);
  const [courseDuration, setCourseDuration] = useState<number>(4);

  // Calculations
  const calculateROI = () => {
    let currentSalary = salary;
    let totalEarnings = 0;
    const yearlyData = [];
    let breakEvenYear = -1;

    for (let year = 1; year <= 10; year++) {
      totalEarnings += currentSalary;
      const netProfit = totalEarnings - fees;
      
      if (netProfit >= 0 && breakEvenYear === -1) {
        breakEvenYear = year;
      }

      yearlyData.push({
        year,
        salary: currentSalary,
        netProfit,
        isBreakEven: netProfit >= 0
      });

      // Increase salary by growth rate
      currentSalary = currentSalary + (currentSalary * (growthRate / 100));
    }

    return { yearlyData, breakEvenYear, total10YearEarnings: totalEarnings };
  };

  const { yearlyData, breakEvenYear, total10YearEarnings } = calculateROI();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB] font-sans pb-20">
      
      {/* Premium Header Section */}
      <section className="bg-white border-b border-gray-100 pt-20 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(255,56,92,0.05)_0%,transparent_60%)] blur-[80px]" />
          <div className="absolute top-[40%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle,rgba(0,255,128,0.03)_0%,transparent_60%)] blur-[80px]" />
        </div>
        
        <div className="max-w-[1200px] mx-auto relative z-10 text-center">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF0F2] border border-[#FF385C]/20 text-[#FF385C] text-sm font-bold mb-6 animate-fade-in"
          >
            <Calculator className="w-4 h-4 text-[#FF385C]" />
            <span>Smart Analytics Engine</span>
          </div>
          <h1 
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-gray-900 animate-fade-in"
          >
            Return on <span className="text-[#FF385C]">Investment</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto animate-fade-in">
            Calculate the true value of your education. See exactly when you&apos;ll break even and forecast your 10-year career trajectory.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left: Input Controls */}
          <div 
            className="w-full lg:w-[400px] bg-white rounded-[32px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 shrink-0 h-fit"
          >
            <h3 className="text-2xl font-extrabold text-gray-900 mb-8">Investment Details</h3>
            
            <div className="space-y-8">
              {/* Fees Input */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="font-bold text-gray-700">Total Course Fees</label>
                  <span className="text-[#FF385C] font-extrabold">{formatCurrency(fees)}</span>
                </div>
                <input 
                  type="range" 
                  min="100000" max="5000000" step="50000"
                  value={fees}
                  onChange={(e) => setFees(Number(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#FF385C]"
                />
              </div>

              {/* Salary Input */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="font-bold text-gray-700">Expected Starting Salary</label>
                  <span className="text-green-600 font-extrabold">{formatCurrency(salary)}</span>
                </div>
                <input 
                  type="range" 
                  min="200000" max="4000000" step="50000"
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
              </div>

              {/* Growth Rate Input */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="font-bold text-gray-700">Annual Salary Growth</label>
                  <span className="text-blue-600 font-extrabold">{growthRate}%</span>
                </div>
                <input 
                  type="range" 
                  min="5" max="30" step="1"
                  value={growthRate}
                  onChange={(e) => setGrowthRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              {/* Course Duration */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="font-bold text-gray-700">Course Duration</label>
                  <span className="text-gray-900 font-extrabold">{courseDuration} Years</span>
                </div>
                <div className="flex gap-2">
                  {[2, 3, 4, 5].map(year => (
                    <button 
                      key={year}
                      onClick={() => setCourseDuration(year)}
                      className={`flex-1 py-3 rounded-xl font-bold transition-all ${courseDuration === year ? 'bg-gray-900 text-white shadow-md' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                    >
                      {year}Y
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-10 p-5 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="flex gap-3">
                <Lightbulb className="w-5 h-5 text-blue-600 shrink-0" />
                <p className="text-sm font-medium text-blue-800 leading-relaxed">
                  ROI is a critical factor when taking education loans. Aim for a college where you can break even within 3-4 years.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Data Visualization */}
          <div 
            className="flex-1 space-y-8"
          >
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Clock className="w-24 h-24 text-gray-900" />
                </div>
                <h4 className="text-gray-500 font-bold mb-2">Break-even Point</h4>
                <div className="text-5xl font-extrabold text-gray-900 mb-2">
                  {breakEvenYear > 0 ? `${breakEvenYear} Years` : '10+ Years'}
                </div>
                <p className="text-sm font-medium text-gray-500">
                  Time taken to recover your full course fee of {formatCurrency(fees)}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-[#FF385C] to-[#E50027] rounded-[32px] p-8 shadow-lg shadow-red-500/20 relative overflow-hidden group text-white">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
                  <TrendingUp className="w-24 h-24 text-white" />
                </div>
                <h4 className="text-white/80 font-bold mb-2">10-Year Gross Earnings</h4>
                <div className="text-4xl md:text-5xl font-extrabold mb-2">
                  {formatCurrency(total10YearEarnings)}
                </div>
                <p className="text-sm font-medium text-white/90">
                  Projected total earnings assuming a {growthRate}% annual increment.
                </p>
              </div>
            </div>

            {/* Chart Area */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-extrabold text-gray-900 mb-8">10-Year Financial Forecast</h3>
              
              <div className="h-[300px] flex items-end gap-2 md:gap-4">
                {yearlyData.map((data, index) => {
                  const maxNetProfit = yearlyData[yearlyData.length - 1].netProfit;
                  // Normalize height percentage based on max net profit to make chart dynamic
                  const heightPercent = Math.max(5, (data.netProfit / maxNetProfit) * 100);
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center justify-end gap-3 group relative h-full">
                      {/* Tooltip */}
                      <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs font-bold py-2 px-3 rounded-xl whitespace-nowrap z-10 pointer-events-none">
                        Net: {formatCurrency(data.netProfit)}
                        <div className="text-gray-400 font-medium">Year {data.year}</div>
                      </div>

                      {/* Bar */}
                      <div 
                        style={{ height: `${data.isBreakEven ? heightPercent : 15}%` }}
                        className={`w-full rounded-t-xl transition-all duration-700 ease-out ${
                          data.isBreakEven 
                            ? (index === breakEvenYear - 1 ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 'bg-gray-900 group-hover:bg-[#FF385C]') 
                            : 'bg-red-200'
                        }`}
                      >
                        {index === breakEvenYear - 1 && (
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-extrabold text-green-600 bg-green-100 px-2 py-1 rounded-full whitespace-nowrap border border-green-200">
                            BREAK EVEN
                          </div>
                        )}
                      </div>
                      <div className="text-sm font-bold text-gray-400">Y{data.year}</div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-200"></div>
                  <span className="text-sm font-bold text-gray-500">In Loss (Recovering Fees)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-900"></div>
                  <span className="text-sm font-bold text-gray-500">In Profit (Net Positive)</span>
                </div>
              </div>

            </div>
            
          </div>
        </div>
      </div>
    </main>
  );
}
