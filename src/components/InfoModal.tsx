import React from "react";
import { X, Shield, Book, FileText, Mail, Globe, MapPin, Award, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface InfoModalProps {
  type: "about" | "terms" | "privacy" | "profile" | null;
  onClose: () => void;
}

export default function InfoModal({ type, onClose }: InfoModalProps) {
  if (!type) return null;

  const contentMap = {
    profile: {
      title: "Author Profile",
      icon: <Award className="w-6 h-6 text-emerald-600" />,
      body: (
        <div className="space-y-6 text-gray-700">
          {/* Hero Header Section */}
          <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-emerald-800 to-slate-900 p-6 text-white shadow-md flex flex-col sm:flex-row items-center gap-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.15),transparent)] pointer-events-none" />
            
            {/* Avatar image */}
            <div className="relative shrink-0">
              <img
                src="/images/foto_profile.jpg"
                alt="Haris Chandra Agustina"
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-lg"
              />
              <span className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="text-center sm:text-left space-y-1 flex-1">
              <h4 className="serif-title text-2xl font-bold tracking-tight">
                Haris Chandra Agustina
              </h4>
              <p className="text-xs uppercase tracking-widest font-mono text-emerald-300 font-bold">
                Senior Cultural Critic & Author
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 pt-2 text-xs text-emerald-100/80">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  Indonesia
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  harchana.world
                </span>
              </div>
            </div>
          </div>

          {/* About Bio Section */}
          <div className="space-y-3">
            <h5 className="mono-text text-xs font-bold tracking-widest text-emerald-700 uppercase">
              About Me
            </h5>
            <p className="text-sm leading-relaxed text-gray-600">
              Halo semua, perkenalkan namaku <strong>Haris Chandra Agustina</strong>. Bisa dipanggil Haris, atau Agus di rumah. Saya adalah pengasong kata yang mendedikasikan diri untuk merangkai pikiran menjadi barisan kalimat bermakna—membangun sebuah "prasasti digital" penanda eksistensi diri di era modern.
            </p>
            <p className="text-sm leading-relaxed text-gray-600">
              Perjalanan menulis saya dimulai sejak tahun 2013, didorong oleh hasrat besar untuk diakui, didengar, dan menginspirasi orang lain, layaknya penulis-penulis legendaris dunia. Saya sangat percaya pada keindahan ruang kosong, keheningan di sela-sela kalimat, dan kekuatan pesan murni yang menyentuh jiwa.
            </p>
          </div>

          {/* Quick Info & Passions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2 overflow-hidden">
              <span className="mono-text text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Direct Contact
              </span>
              <a
                href="mailto:agusgp2@gmail.com"
                className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors break-all"
              >
                <Mail className="w-4 h-4 shrink-0 text-emerald-600" />
                agusgp2@gmail.com
              </a>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2">
              <span className="mono-text text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Focus Areas
              </span>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-medium">
                  Creative Prose
                </span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-medium">
                  Cultural Critique
                </span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-medium">
                  Digital Monument
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    about: {
      title: "About Harchana World",
      icon: <Book className="w-6 h-6 text-emerald-600" />,
      body: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            Selamat datang di <strong>Harchana World</strong>, prasasti digital pribadi milik <strong>Haris Chandra Agustina</strong>. Blog ini didirikan sebagai wadah refleksi mendalam, motivasi menulis, dan ruang eksplorasi gagasan kreatif.
          </p>
          <p>
            Nama <strong>Harchana</strong> merupakan gabungan dari nama sang penulis, melambangkan dedikasi penuh terhadap dunia literasi digital dan arsitektur kata-kata. Terinspirasi dari kisah penulis legendaris seperti J.K. Rowling, kami percaya setiap kata memiliki kekuatan untuk menciptakan perubahan dan mengabadikan pemikiran melintasi waktu.
          </p>
          <p>
            Melalui tulisan-tulisan di blog ini, Haris ingin membagikan kisah tentang impian, pelajaran hidup, arsitektur pikiran, dan kegemaran menulis kepada pembaca di seluruh dunia. Terima kasih telah menjadi bagian dari perjalanan kreatif ini.
          </p>
        </div>
      ),
    },
    terms: {
      title: "Terms of Service",
      icon: <FileText className="w-6 h-6 text-emerald-600" />,
      body: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            Dengan mengakses dan membaca konten di <strong>Harchana World</strong>, Anda setuju untuk mematuhi ketentuan-ketentuan berikut:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Hak Cipta:</strong> Seluruh karya tulis, artikel, dan materi kreatif di blog ini adalah milik sah dari Haris Chandra Agustina, kecuali dinyatakan lain. Dilarang keras menyalin atau mendistribusikan ulang tanpa izin tertulis.
            </li>
            <li>
              <strong>Etika Berkomentar:</strong> Kami menyambut hangat refleksi dan diskusi dari pembaca. Mohon gunakan bahasa yang sopan, konstruktif, dan bebas dari unsur SARA atau kebencian.
            </li>
            <li>
              <strong>Batasan Tanggung Jawab:</strong> Semua artikel merupakan pandangan pribadi penulis dan disediakan hanya untuk tujuan informasi umum dan hiburan.
            </li>
          </ul>
        </div>
      ),
    },
    privacy: {
      title: "Privacy Policy",
      icon: <Shield className="w-6 h-6 text-emerald-600" />,
      body: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            Kami sangat menghargai privasi para pengunjung <strong>Harchana World</strong>. Berikut adalah beberapa hal yang perlu Anda ketahui mengenai data Anda:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Penyimpanan Lokal (Local Storage):</strong> Blog ini menggunakan fitur penyimpanan lokal browser Anda untuk mengabadikan interaksi Anda (seperti jumlah Claps yang Anda berikan dan komentar/refleksi yang Anda kirimkan). Ini murni digunakan demi memberikan kenyamanan dan fungsionalitas interaktif yang instan.
            </li>
            <li>
              <strong>Data Pribadi:</strong> Kami tidak memperjualbelikan atau membagikan nama atau alamat email yang Anda masukkan dalam formulir komentar kepada pihak ketiga mana pun.
            </li>
            <li>
              <strong>Analitik Kunjungan:</strong> Kami memantau jumlah kunjungan dan pembaca aktif secara anonim untuk melacak minat pembaca dan mengembangkan kualitas tulisan di masa depan.
            </li>
          </ul>
        </div>
      ),
    },
  };

  const current = contentMap[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" 
      />
      
      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden border border-gray-100 z-10"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 bg-gray-50/50">
          <div className="flex items-center gap-3">
            {current.icon}
            <h3 className="serif-title text-xl font-bold text-gray-900">
              {current.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {current.body}
        </div>
        
        <div className="border-t border-gray-100 px-6 py-3 bg-gray-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
