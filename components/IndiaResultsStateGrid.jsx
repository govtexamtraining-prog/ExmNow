import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Search, ChevronRight, Sparkles, Building2, Globe2, Award } from 'lucide-react';

export const INDIA_STATES = [
  { code: 'AP', name: 'Andhra Pradesh', short: 'AP', boards: 'BIEAP, BSEAP', universities: 'Andhra Univ, SVU' },
  { code: 'AS', name: 'Assam', short: 'Assam', boards: 'SEBA, AHSEC', universities: 'Gauhati Univ, Dibrugarh' },
  { code: 'BR', name: 'Bihar', short: 'Bihar', boards: 'BSEB 10th & 12th', universities: 'Patna Univ, Magadh Univ' },
  { code: 'CG', name: 'Chhattisgarh', short: 'Chhattisgarh', boards: 'CGBSE', universities: 'Pt. RSU, Bastar Univ' },
  { code: 'DL', name: 'Delhi', short: 'Delhi', boards: 'CBSE, ICSE', universities: 'DU, IPU, JNU, Jamia' },
  { code: 'GA', name: 'Goa', short: 'Goa', boards: 'GBSHSE', universities: 'Goa University' },
  { code: 'GJ', name: 'Gujarat', short: 'Gujarat', boards: 'GSEB SSC & HSC', universities: 'Gujarat Univ, MSU Baroda' },
  { code: 'HR', name: 'Haryana', short: 'Haryana', boards: 'BSEH Bhiwani', universities: 'Kurukshetra Univ, MDU' },
  { code: 'HP', name: 'Himachal Pradesh', short: 'Himachal', boards: 'HPBOSE Dharamshala', universities: 'HPU Shimla' },
  { code: 'JK', name: 'Jammu & Kashmir', short: 'J & K', boards: 'JKBOSE 10th & 12th', universities: 'Kashmir Univ, Jammu Univ' },
  { code: 'JH', name: 'Jharkhand', short: 'Jharkhand', boards: 'JAC Ranchi', universities: 'Ranchi Univ, VBU' },
  { code: 'KA', name: 'Karnataka', short: 'Karnataka', boards: 'KSEAB 10th & PUC', universities: 'Bangalore Univ, VTU, Mysore' },
  { code: 'KL', name: 'Kerala', short: 'Kerala', boards: 'DHSE Plus Two, SSLC', universities: 'Kerala Univ, Calicut Univ, MG' },
  { code: 'MP', name: 'Madhya Pradesh', short: 'MP', boards: 'MPBSE Bhopal', universities: 'BU Bhopal, DAVV Indore' },
  { code: 'MH', name: 'Maharashtra', short: 'Maharashtra', boards: 'MSBSHSE HSC & SSC', universities: 'Mumbai Univ, SPPU Pune' },
  { code: 'OD', name: 'Odisha', short: 'Odisha', boards: 'CHSE & BSE Odisha', universities: 'Utkal Univ, Sambalpur' },
  { code: 'PB', name: 'Punjab', short: 'Punjab', boards: 'PSEB 10th & 12th', universities: 'GNDU, Punjabi Univ, PTU' },
  { code: 'RJ', name: 'Rajasthan', short: 'Rajasthan', boards: 'RBSE Ajmer', universities: 'Uniraj Jaipur, MDSU' },
  { code: 'TN', name: 'Tamil Nadu', short: 'Tamil Nadu', boards: 'DGE TN +2 & SSLC', universities: 'Anna Univ, Madras Univ' },
  { code: 'TS', name: 'Telangana', short: 'Telangana', boards: 'TSBIE, SSC Board', universities: 'Osmania Univ, JNTUH, KU' },
  { code: 'UP', name: 'Uttar Pradesh', short: 'UP', boards: 'UPMSP Prayagraj', universities: 'Lucknow Univ, AKTU, CCSU' },
  { code: 'UK', name: 'Uttarakhand', short: 'Uttarakhand', boards: 'UBSE Ramnagar', universities: 'HNBGU, Kumaun Univ' },
  { code: 'WB', name: 'West Bengal', short: 'WB', boards: 'WBBSE & WBCHSE', universities: 'Calcutta Univ, Jadavpur' },
  { code: 'AR', name: 'Arunachal Pradesh', short: 'Arunachal', boards: 'CBSE Affiliated', universities: 'Rajiv Gandhi Univ' },
  { code: 'MN', name: 'Manipur', short: 'Manipur', boards: 'BOSEM, COHSEM', universities: 'Manipur University' },
  { code: 'ML', name: 'Meghalaya', short: 'Meghalaya', boards: 'MBOSE Tura', universities: 'NEHU Shillong' },
  { code: 'MZ', name: 'Mizoram', short: 'Mizoram', boards: 'MBSE Aizawl', universities: 'Mizoram University' },
  { code: 'NL', name: 'Nagaland', short: 'Nagaland', boards: 'NBSE Kohima', universities: 'Nagaland University' },
  { code: 'SK', name: 'Sikkim', short: 'Sikkim', boards: 'CBSE Affiliated', universities: 'Sikkim University' },
  { code: 'TR', name: 'Tripura', short: 'Tripura', boards: 'TBSE Agartala', universities: 'Tripura University' },
];

export default function IndiaResultsStateGrid({ onSelectState, selectedState = 'ALL' }) {
  const [searchFilter, setSearchFilter] = useState('');

  const filteredStates = INDIA_STATES.filter(st => 
    st.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    st.short.toLowerCase().includes(searchFilter.toLowerCase()) ||
    st.boards.toLowerCase().includes(searchFilter.toLowerCase()) ||
    st.universities.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-black uppercase tracking-wider mb-2">
            <Globe2 className="w-3.5 h-3.5" />
            <span>INDIARESULTS STATE DIRECTORY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Select State / UT for Board & University Results
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Complete pan-India network of 29 State Education Boards, 800+ Universities, and Public Service Commissions.
          </p>
        </div>

        {/* State Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search state, board, or univ..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* State Grid */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
        {/* All India Option */}
        <button
          onClick={() => onSelectState && onSelectState('ALL')}
          className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between group ${
            selectedState === 'ALL'
              ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white border-transparent shadow-lg shadow-emerald-600/30 font-black'
              : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/40 text-slate-800 dark:text-slate-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">
              PAN-INDIA
            </span>
            <Award className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2">
            <div className="text-xs font-black truncate">All-India Central</div>
            <div className="text-[10px] text-slate-400 dark:text-slate-400 truncate">CBSE, NTA, SSC, UPSC</div>
          </div>
        </button>

        {filteredStates.map((st) => {
          const isSelected = selectedState === st.name;
          return (
            <button
              key={st.code}
              onClick={() => onSelectState && onSelectState(st.name)}
              className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between group ${
                isSelected
                  ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white border-transparent shadow-lg shadow-emerald-600/30'
                  : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/40 text-slate-800 dark:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
                  isSelected ? 'bg-black/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {st.short}
                </span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${
                  isSelected ? 'text-white' : 'text-slate-400'
                }`} />
              </div>
              <div className="mt-2">
                <div className="text-xs font-extrabold truncate">{st.name}</div>
                <div className={`text-[10px] truncate ${isSelected ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  {st.boards}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Service Badges */}
      <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Class 10th & 12th Board Results
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-brand-500" />
            University Semester Marksheets
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            Name-Wise Reverse Search
          </span>
        </div>
        <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
          ⚡ 29 States & Union Territories Active
        </div>
      </div>
    </section>
  );
}
