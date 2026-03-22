import React from 'react';
import { User, Mail, Phone, MapPin, Camera, Save } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="pt-12 px-8 md:px-16 pb-32 w-full max-w-5xl mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col gap-3 mb-16">
        <h1 className="text-5xl lg:text-7xl font-serif-display text-on-surface flex items-center gap-6">
          <User size={50} className="text-primary" />
          Mon Profil
        </h1>
        <p className="text-on-surface-variant font-medium text-lg max-w-2xl">
          Gérez vos informations personnelles et votre identité sur AgroConnect.
        </p>
      </div>

      <div className="bg-surface-container-lowest rounded-[3rem] shadow-xl border border-outline-variant/10 overflow-hidden">
         <div className="h-48 bg-primary/10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--primary) 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>
            <button className="absolute bottom-6 right-8 bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary shadow-2xl border border-white hover:scale-105 transition-all">Changer la bannière</button>
         </div>
         
         <div className="px-12 pb-12 -mt-16 relative z-10">
            <div className="relative inline-block group">
               <div className="w-40 h-40 rounded-[3rem] bg-white p-2 shadow-2xl overflow-hidden ring-8 ring-surface-container-lowest">
                  <div className="w-full h-full bg-primary/5 rounded-[2.5rem] flex items-center justify-center text-primary/30 group-hover:scale-110 transition-transform duration-700">
                     <User size={80} />
                  </div>
               </div>
               <button className="absolute bottom-2 right-2 p-4 bg-primary text-white rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all border-4 border-white">
                  <Camera size={20} />
               </button>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-outline uppercase tracking-widest px-2">Identité Complète</label>
                  <input type="text" defaultValue={user?.name} className="w-full px-8 py-5 bg-surface-container-low focus:bg-white border-2 border-transparent focus:border-primary/20 rounded-3xl font-black text-lg text-on-surface focus:ring-0 transition-all shadow-inner" />
               </div>
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-outline uppercase tracking-widest px-2">Email</label>
                  <input type="email" defaultValue={user?.email} className="w-full px-8 py-5 bg-surface-container-low focus:bg-white border-2 border-transparent focus:border-primary/20 rounded-3xl font-black text-lg text-on-surface focus:ring-0 transition-all shadow-inner" />
               </div>
            </div>
            
            <div className="mt-16 flex justify-end">
               <button className="px-16 py-5 bg-primary text-white rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 hover:brightness-110 active:scale-95 transition-all flex items-center gap-4 group">
                 <Save size={18} className="group-hover:rotate-12 transition-transform" /> Mettre à jour mon profil
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ProfilePage;
