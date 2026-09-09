import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const ResetPassword = () => {
  const [ready, setReady]         = useState(false);
  const [password, setPassword]   = useState('');
  const [confirm, setConfirm]     = useState('');
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);
  const [done, setDone]           = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase turns the recovery link into a logged-in session automatically.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setReady(true);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('הסיסמה חייבת להכיל לפחות 6 תווים.');
      return;
    }
    if (password !== confirm) {
      setError('הסיסמאות אינן תואמות.');
      return;
    }

    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (updateError) {
      setError('עדכון הסיסמה נכשל. נסה לבקש לינק חדש.');
      return;
    }

    setDone(true);
    setTimeout(() => navigate('/portal'), 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4" dir="rtl">
      <div className="w-full max-w-md">

        <div className="text-center mb-10">
          <Link to="/">
            <img src="/logo-hey.png" alt="HEY Digital" className="h-12 mx-auto mb-4" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">איפוס סיסמה</h1>
          <p className="text-muted-foreground text-sm mt-2">בחר סיסמה חדשה לחשבון שלך</p>
        </div>

        <div className="bg-muted/20 border border-border rounded-2xl p-8">
          {!ready && !done && (
            <p className="text-muted-foreground text-sm text-center">
              מאמת את הלינק...
            </p>
          )}

          {ready && !done && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">סיסמה חדשה</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="לפחות 6 תווים"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">אימות סיסמה</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  placeholder="הקלד שוב את הסיסמה"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              {error && (
                <div className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                {loading ? 'מעדכן...' : 'עדכן סיסמה'}
              </button>
            </form>
          )}

          {done && (
            <div className="text-primary text-sm text-center bg-primary/10 border border-primary/20 rounded-xl px-4 py-3">
              הסיסמה עודכנה בהצלחה. מעביר אותך לפאנל...
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;
