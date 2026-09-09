import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const Login = () => {
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);

  const [forgotMode, setForgotMode]     = useState(false);
  const [forgotEmail, setForgotEmail]   = useState('');
  const [forgotSent, setForgotSent]     = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError]   = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (signInError) {
      setError('אימייל או סיסמה שגויים.');
      setLoading(false);
      return;
    }

    navigate('/portal');
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotError('');

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      forgotEmail.trim().toLowerCase(),
      { redirectTo: `${window.location.origin}/reset-password` }
    );

    setForgotLoading(false);

    if (resetError) {
      setForgotError('שליחת המייל נכשלה. נסה שוב.');
      return;
    }

    setForgotSent(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4" dir="rtl">
      <div className="w-full max-w-md">

        <div className="text-center mb-10">
          <Link to="/">
            <img src="/logo-hey.png" alt="HEY Digital" className="h-12 mx-auto mb-4" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">כניסת לקוחות</h1>
          <p className="text-muted-foreground text-sm mt-2">הכנס לפאנל הניהול האישי שלך</p>
        </div>

        <div className="bg-muted/20 border border-border rounded-2xl p-8">
          {!forgotMode ? (
            <form onSubmit={handleLogin} className="space-y-5">

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">אימייל</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">סיסמה</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="הסיסמה שלך"
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
                {loading ? 'מתחבר...' : 'כניסה לפאנל'}
              </button>

            </form>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-5">

              {forgotSent ? (
                <div className="text-primary text-sm text-center bg-primary/10 border border-primary/20 rounded-xl px-4 py-3">
                  נשלח מייל עם לינק לאיפוס סיסמה. בדוק את תיבת הדואר שלך.
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">אימייל</label>
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  {forgotError && (
                    <div className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                      {forgotError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full py-3 px-6 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60"
                  >
                    {forgotLoading ? 'שולח...' : 'שלח לינק לאיפוס'}
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => { setForgotMode(false); setForgotSent(false); setForgotError(''); }}
                className="w-full text-center text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                ← חזרה להתחברות
              </button>

            </form>
          )}
        </div>

        {!forgotMode && (
          <>
            <p className="text-center text-xs text-muted-foreground mt-6">
              אין לך גישה? <a href="mailto:eladauto66@gmail.com" className="text-primary hover:underline">צור קשר</a>
            </p>
            <p className="text-center text-xs text-muted-foreground mt-2">
              <button
                onClick={() => setForgotMode(true)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                שכחתי סיסמה
              </button>
            </p>
          </>
        )}
        <div className="text-center mt-4">
          <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            ← חזרה לאתר
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
