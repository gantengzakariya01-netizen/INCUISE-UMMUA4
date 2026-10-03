import React, { useState } from 'react';
import { INITIAL_REVIEWS } from '../../data/restaurantData';
import { Star, MessageSquarePlus, Quote } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../ui/Modal';
import { soundEffects } from '../../utils/soundEffects';

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
      showToast('Mohon tuliskan pengalaman santap Anda.', 'error');
      return;
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      product_id: 'prod-01',
      user_name: user?.full_name || 'VIP Patron',
      user_avatar: user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: ratingInput,
      comment: commentInput,
      created_at: new Date().toISOString()
    };

    setReviewsList([newReview, ...reviewsList]);
    setCommentInput('');
    setIsAddReviewOpen(false);
    soundEffects.playSuccessChime();
    showToast('Ulasan Anda berhasil ditayangkan! Terima kasih atas apresiasinya.', 'success');
  };

  return (
    <section id="reviews" className="py-24 relative bg-[#0d0d10] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16">
          <div className="space-y-3 text-center lg:text-left">
            <span className="font-display tracking-[0.25em] text-xs text-[#ff8c00] uppercase block">
              PATRON TESTIMONIALS
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              WHAT THE BEASTS SAY
            </h2>
            <p className="text-sm text-[#d5d0c8] max-w-xl">
              Apresiasi dari para atlet, chef profesional, dan penikmat kuliner ayam kelas atas.
            </p>
          </div>

          <div className="flex items-center gap-6 glass-panel rounded-2xl p-5 border border-white/10 shrink-0">
            <div className="text-center">
              <span className="font-display text-4xl text-[#ff8c00] font-black">4.98</span>
              <div className="flex items-center gap-1 text-amber-400 justify-center my-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-[10px] font-mono text-white/50">2,450+ Verified Reviews</span>
            </div>
            
            <div className="border-l border-white/10 pl-6">
              <button
                onClick={() => {
                  setIsAddReviewOpen(true);
                  soundEffects.playClick();
                }}
                className="btn-amber px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>WRITE REVIEW</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between relative group"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-[#ff8c00]/15 group-hover:text-[#ff8c00]/30 transition-colors" />

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
                  className="w-10 h-10 rounded-full object-cover border border-[#ff8c00]"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">{rev.user_name}</h4>
                  <span className="text-[10px] text-[#ff8c00] font-mono">VERIFIED PATRON</span>
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
        title="WRITE PATRON REVIEW"
        subtitle="Bagikan pengalaman rasa santapan Muscle Chicken Anda."
      >
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-white/80 mb-2">BINTANG PENILAIAN</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    setRatingInput(star);
                    soundEffects.playClick();
                  }}
                  className="p-1 text-amber-400 focus:outline-none"
                >
                  <Star className={`w-6 h-6 ${star <= ratingInput ? 'fill-amber-400' : 'text-white/20'}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-white/80 mb-1">ULASAN ANDA</label>
            <textarea
              rows={4}
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Ceritakan tentang kegaringan kulit, kelembutan daging, dan saus..."
              className="w-full p-3 rounded-xl bg-[#141418] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#ff8c00]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAddReviewOpen(false)}
              className="px-4 py-2 rounded-xl text-xs text-white/60 hover:text-white"
            >
              Batal
            </button>
            <button type="submit" className="btn-amber px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider">
              Kirim Ulasan
            </button>
          </div>
        </form>
      </Modal>

    </section>
  );
};
