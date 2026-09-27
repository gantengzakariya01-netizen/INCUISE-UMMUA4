import React, { useState } from 'react';
import { INITIAL_REVIEWS } from '../../data/restaurantData';
import { Star, MessageSquarePlus, Quote } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../ui/Modal';

export const ReviewsSection: React.FC = () => {
  const { showToast } = useUI();
  const { user } = useAuth();
  const [reviewsList, setReviewsList] = useState(INITIAL_REVIEWS);
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);

  const [ratingInput, setRatingInput] = useState(5);
  const [commentInput, setCommentInput] = useState('');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) {
      showToast('Mohon tuliskan pengalaman ulasan Anda.', 'error');
      return;
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      product_id: 'p1000000-0000-4000-8000-000000000001',
      user_name: user?.full_name || 'Pelanggan VIP',
      user_avatar: user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: ratingInput,
      comment: commentInput,
      created_at: new Date().toISOString()
    };

    setReviewsList([newReview, ...reviewsList]);
    setCommentInput('');
    setIsAddReviewOpen(false);
    showToast('Ulasan Anda berhasil dikirim! Terima kasih.', 'success');
  };

  return (
    <section id="reviews" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Rating Breakdown */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-14">
          <div className="space-y-3 text-center lg:text-left">
            <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-widest block">
              Ulasan & Apresiasi Pelanggan
            </span>
            <h2 className="font-luxury text-3xl sm:text-4xl font-extrabold text-gold-gradient">
              Kata Mereka Tentang ICUISENE UMMU A4
            </h2>
            <p className="text-sm text-[#bda8d6] max-w-xl">
              Kepercayaan dan kepuasan para penikmat kuliner sejati adalah kebanggaan tertinggi kami.
            </p>
          </div>

          <div className="flex items-center gap-6 glass-panel rounded-2xl p-5 border border-[#d4af37]/30 shrink-0">
            <div className="text-center">
              <span className="font-luxury text-4xl font-extrabold text-[#d4af37]">4.9</span>
              <div className="flex items-center gap-1 text-amber-400 justify-center my-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-[11px] text-white/50">2,500+ Ulasan Pengunjung</span>
            </div>
            
            <div className="border-l border-white/10 pl-6">
              <button
                onClick={() => setIsAddReviewOpen(true)}
                className="btn-gold px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-2"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Tulis Ulasan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="glass-card rounded-2xl p-6 border border-[#d4af37]/20 flex flex-col justify-between relative group"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-[#d4af37]/15 group-hover:text-[#d4af37]/30 transition-colors" />

              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-white/80 italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-4 border-t border-white/10">
                <img
                  src={rev.user_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                  alt={rev.user_name}
                  className="w-10 h-10 rounded-full object-cover border border-[#d4af37]"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">{rev.user_name}</h4>
                  <span className="text-[10px] text-[#bda8d6]">Verified VIP Diner</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Write Review Modal */}
      <Modal
        isOpen={isAddReviewOpen}
        onClose={() => setIsAddReviewOpen(false)}
        title="Tulis Ulasan Kuliner"
        subtitle="Bagikan pengalaman rasa santapan Anda bersama ICUISENE UMMU A4."
      >
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-white/80 mb-2">Penilaian Bintang</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRatingInput(star)}
                  className="p-1 text-amber-400 focus:outline-none"
                >
                  <Star className={`w-6 h-6 ${star <= ratingInput ? 'fill-amber-400' : 'text-white/20'}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/80 mb-1">Pengalaman Ulasan Anda</label>
            <textarea
              rows={4}
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Ceritakan tentang cita rasa, kemasan, dan kualitas hidangan..."
              className="w-full p-3 rounded-xl bg-[#180a2a] border border-[#d4af37]/30 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAddReviewOpen(false)}
              className="px-4 py-2 rounded-xl text-xs text-white/70 hover:text-white"
            >
              Batal
            </button>
            <button type="submit" className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold">
              Kirim Ulasan
            </button>
          </div>
        </form>
      </Modal>

    </section>
  );
};
