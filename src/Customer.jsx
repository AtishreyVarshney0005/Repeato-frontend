import { useEffect, useState } from 'react';
import Logo from './Logo';
import { BUSINESS, REWARDS } from './data';
export default function Customer({ theme, setTheme, onBack }) {
    const [screen, setScreen] = useState('auth');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [authMode, setAuthMode] = useState('signin');
    const [showPassword, setShowPassword] = useState(false);
    const [points, setPoints] = useState(0);
    const [tx, setTx] = useState([]);
    const [toast, setToast] = useState('');
    useEffect(() => { if (toast) {
        const t = setTimeout(() => setToast(''), 2500);
        return () => clearTimeout(t);
    } }, [toast]);
    const join = (event) => {
        event.preventDefault();
        if (authMode === 'signup') {
            setPoints(10);
            setTx([{ title: 'Welcome bonus', when: 'Today', pts: 10 }]);
        }
        setScreen('success');
    };
    const next = REWARDS[0].pts;
    const pct = Math.min(100, (points / next) * 100);
    return (<div className={`phone${['welcome', 'auth'].includes(screen) ? ' auth-page' : ''}`}>
      {screen === 'welcome' && (<div className="auth-layout">
          <section className="auth-story">
            <div className="row auth-brand"><div className="logo-tile xs"><Logo size={30}/></div><b>Repeato</b></div>
            <div className="auth-copy">
              <span className="eyebrow">A little more love for local</span>
              <h1>Good visits.<br/><span>Great rewards.</span></h1>
              <p>Discover neighbourhood favourites, collect points with every visit, and make your next treat feel even sweeter.</p>
            </div>
            <div className="auth-benefits">
              <div><span>01</span><p><b>Visit your favourites</b><small>Support the local spots you love.</small></p></div>
              <div><span>02</span><p><b>Collect points</b><small>Every visit brings you closer to a treat.</small></p></div>
              <div><span>03</span><p><b>Enjoy the little wins</b><small>Redeem rewards made for you.</small></p></div>
            </div>
            <div className="auth-note"><span>✦</span> Your neighbourhood, a little more rewarding.</div>
          </section>
          <section className="auth-card">
            <button className="auth-back" onClick={onBack}>← <span>Main menu</span></button>
            <div className="auth-mobile-brand"><Logo size={38}/><b>Repeato</b></div>
            <span className="eyebrow">YOUR LOCAL REWARDS CLUB</span>
            <h2>Create your account</h2>
            <p className="muted">Join free and start earning points on the things you already love.</p>
            <button className="btn auth-primary" onClick={() => { setAuthMode('signup'); setScreen('auth'); }}>Create a free account <span>→</span></button>
            <button className="btn ghost auth-secondary" onClick={() => { setAuthMode('signin'); setScreen('auth'); }}>I already have an account</button>
            <div className="auth-trust"><span>✓</span> Free to join <i/> No app download <i/> Made for local</div>
            <p className="auth-demo-note">Preview mode: authentication and rewards are sample data until a backend is connected.</p>
          </section>
        </div>)}

      {screen === 'auth' && (<div className="auth-layout auth-layout-form">
          <section className="auth-story auth-story-compact">
            <div className="row auth-brand"><div className="logo-tile xs"><Logo size={30}/></div><b>Repeato</b></div>
            <div className="auth-copy">
              <span className="eyebrow">A LITTLE SOMETHING EXTRA</span>
              <h1>Your next<br/><span>treat awaits.</span></h1>
              <p>One account for all your favourite neighbourhood rewards.</p>
            </div>
            <div className="auth-note"><span>✦</span> Visit. Earn. Return.</div>
          </section>
          <section className="auth-card auth-card-form">
            <button className="auth-back" onClick={() => setScreen('welcome')}>← <span>Back</span></button>
            <span className="eyebrow">{authMode === 'signup' ? 'GET STARTED' : 'WELCOME BACK'}</span>
            <h2>{authMode === 'signup' ? 'Create your account' : 'Sign in to Repeato'}</h2>
            <p className="muted">{authMode === 'signup' ? 'A few details and you’re ready to earn.' : 'Pick up right where you left off.'}</p>
            <form className="auth-form" onSubmit={join}>
              {authMode === 'signup' && <label className="auth-input-wrap">
                <span>Your name</span>
                <input autoComplete="name" placeholder="e.g. Alex Morgan" value={name} onChange={e => setName(e.target.value)} required/>
              </label>}
              <label className="auth-input-wrap">
                <span>Email address</span>
                <input type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required/>
              </label>
              <label className="auth-input-wrap">
                <span>Password</span>
                <div className="auth-password">
                  <input type={showPassword ? 'text' : 'password'} autoComplete={authMode === 'signup' ? 'new-password' : 'current-password'} placeholder="At least 8 characters" value={password} onChange={e => setPassword(e.target.value)} minLength={8} required/>
                  <button type="button" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button>
                </div>
              </label>
              {authMode === 'signup' && <label className="auth-input-wrap">
                <span>Confirm password</span>
                <input type="password" autoComplete="new-password" placeholder="Re-enter your password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} minLength={8} required/>
              </label>}
              {authMode === 'signup' && password && confirmPassword && password !== confirmPassword && <p className="auth-error" role="alert">Passwords don’t match yet.</p>}
              <button className="btn auth-primary" type="submit" disabled={authMode === 'signup' && password !== confirmPassword}>
                {authMode === 'signup' ? 'Create account' : 'Sign in'} <span>→</span>
              </button>
            </form>
            <p className="auth-mode-toggle">{authMode === 'signup' ? 'Already a member?' : 'New to Repeato?'} <button onClick={() => { setAuthMode(authMode === 'signup' ? 'signin' : 'signup'); setConfirmPassword(''); }}> {authMode === 'signup' ? 'Sign in' : 'Create an account'}</button></p>
            <p className="auth-demo-note">Demo only — connect an authentication provider to enable real accounts.</p>
          </section>
        </div>)}

      {screen === 'success' && (<div className="col full">
          <h3 className="c">{BUSINESS}</h3>
          <div className="center grow">
            <div className="star">★</div>
            <h2 className="big c">You're in!</h2>
            <p className="muted c">{authMode === 'signup' ? `Welcome to ${BUSINESS} rewards. We’ve added 10 demo points to get you started.` : `Welcome back to ${BUSINESS} rewards.`}</p>
            <div className="card w100">
              <div className="row"><span className="muted">Your points</span><b className="pts">{points} <small>/ {next}</small></b></div>
              <Bar pct={pct}/>
              <p>{next - points} more points to your first reward: <b>{REWARDS[0].name}</b></p>
            </div>
          </div>
          <button className="btn" onClick={() => setScreen('home')}>See my rewards</button>
          <button className="link" onClick={() => setToast('Use your browser menu → Add to Home Screen')}>Add to home screen</button>
          <p className="muted c small">Powered by Repeato</p>
        </div>)}

      {['home', 'rewards', 'activity'].includes(screen) && (<div className="col full nopad">
          <div className="scroll">
            <div className="row head">
              <div><span className="muted small">Your rewards at</span><h2 className="big sm">{BUSINESS}</h2></div>
              <button className="icon" onClick={() => setScreen('profile')}>👤</button>
            </div>
            {screen === 'home' && (<>
              <div className="hero">
                <span className="muted">Your points</span>
                <div className="pts xl">{points} <small>/ {next}</small></div>
                <Bar pct={pct} dark/>
                <p>{Math.max(0, next - points)} more points to <b>{REWARDS[0].name}</b></p>
              </div>
              <div className="row gap">
                <button className="btn grow" onClick={() => setToast('Show this to staff — they will verify your purchase')}>▦ Scan QR or Tap NFC</button>
                <button className="btn ghost" style={{ width: 'auto' }}>🍴 Menu</button>
              </div>
              <p className="muted c small">Scan the QR at the counter or tap your phone on the tag to earn points.</p>
              <div className="row"><h3>Rewards</h3><button className="link" onClick={() => setScreen('rewards')}>See all</button></div>
              <RewardList points={points}/>
              <h3>Recent activity</h3><TxList tx={tx}/>
            </>)}
            {screen === 'rewards' && <><h3>All rewards</h3><RewardList points={points}/></>}
            {screen === 'activity' && <><h3>Activity</h3><TxList tx={tx}/></>}
          </div>
          <nav className="tabs">
            {[['home', '⌂', 'Home'], ['rewards', '🎁', 'Rewards'], ['activity', '🕒', 'Activity']].map(([k, i, l]) => (<button key={k} className={screen === k ? 'on' : ''} onClick={() => setScreen(k)}><span>{i}</span>{l}</button>))}
          </nav>
        </div>)}

      {screen === 'profile' && (<div className="col full">
          <div className="row"><button className="icon" onClick={() => setScreen('home')}>‹</button><h3>Profile</h3><span style={{ width: 40 }}/></div>
          <div className="avatar">👤</div>
          <h3 className="c">{name || email.split('@')[0]}</h3>
          <p className="muted c">{email}</p>
          <div className="row gap stats">
            {[[points, 'Points'], [1, 'Visits'], [0, 'Claimed']].map(([n, l]) => <div key={l} className="card c grow"><b>{n}</b><div className="muted small">{l}</div></div>)}
          </div>
          <div className="card invite">
            <b>Invite a friend</b><p className="muted">You both get 20 bonus points when they join.</p>
            <button className="btn" onClick={() => setToast('Invite link copied')}>Share invite link</button>
          </div>
          <div className="card list">
            <div className="li">📅 Birthday <span className="muted">Add ›</span></div>
            <div className="li">🔔 Notifications <span className="muted">On ›</span></div>
            <div className="li" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>🌙 Theme <span className="muted">{theme === 'light' ? 'Light' : 'Dark'} ›</span></div>
            <div className="li">❓ Help <span className="muted">›</span></div>
          </div>
          <div className="card list">
            <div className="li" onClick={() => { setEmail(''); setPassword(''); setConfirmPassword(''); setName(''); setScreen('welcome'); }}>↪ Log out</div>
            <div className="li danger">🗑 Delete my account</div>
          </div>
        </div>)}
      {toast && <div className="toast">{toast}</div>}
    </div>);
}
function Bar({ pct, dark }) {
    return <div className={'bar' + (dark ? ' d' : '')}><i style={{ width: pct + '%' }}/></div>;
}
function RewardList({ points }) {
    return <>{REWARDS.map(r => (<div className="card row item" key={r.id}>
      <div className="ico">{r.icon}</div>
      <div className="grow"><b>{r.name}</b><div className="muted small">{points >= r.pts ? 'Ready to claim' : `${r.pts - points} points to go`}</div></div>
      <b>{r.pts} pts</b>
    </div>))}</>;
}
function TxList({ tx }) {
    return <>{tx.map((t, i) => (<div className="card row item" key={i}><div className="ico">☆</div>
      <div className="grow"><b>{t.title}</b><div className="muted small">{t.when}</div></div><b>+{t.pts} pts</b></div>))}</>;
}
