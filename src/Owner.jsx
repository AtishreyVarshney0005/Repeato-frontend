import { useState } from 'react';
import Logo from './Logo';
import { BUSINESS, REWARDS } from './data';
const NAV = ['Overview', 'Customers', 'Rewards', 'QR and NFC', 'Settings'];
const VISITS = [['Mon', 26, 18], ['Tue', 32, 22], ['Wed', 27, 18], ['Thu', 38, 26], ['Fri', 49, 36], ['Sat', 70, 52], ['Sun', 60, 44]];
const REGULARS = [['maya.p@example.com', 14, '1,240'], ['arjun.k@example.com', 12, '1,060'], ['sana.r@example.com', 11, '940'], ['dev.p@example.com', 9, '780'], ['riya.m@example.com', 9, '720']];
const REDEEMED = [['☕', 'Free coffee', 'maya.p@example.com', '2 min ago'], ['%', '10% off your bill', 'sana.r@example.com', '1 hr ago'], ['☕', 'Free coffee', 'dev.p@example.com', 'Yesterday']];
export default function Owner({ onLogout }) {
    const [nav, setNav] = useState('Overview');
    const [rewards, setRewards] = useState(REWARDS);
    const [qr, setQr] = useState(false);
    const toggle = (id) => setRewards(r => r.map(x => x.id === id ? { ...x, on: !x.on } : x));
    const addReward = () => {
        const name = prompt('Reward name?');
        const pts = Number(prompt('Points required?'));
        if (name && pts > 0)
            setRewards(r => [...r, { id: Date.now(), name, pts, icon: '🎁', claimed: 0, on: true }]);
    };
    return (<div className="owner">
      <aside>
        <div className="row brand"><Logo size={30}/><b>Repeato</b></div>
        {NAV.map(n => <button key={n} className={nav === n ? 'on' : ''} onClick={() => setNav(n)}>{n}</button>)}
        <button className="owner-logout" onClick={onLogout}>↪ Main menu</button>
      </aside>
      <main>
        <div className="row head">
          <div><span className="muted small">Owner dashboard</span><h2 className="big sm">{BUSINESS}</h2></div>
          <div className="row gap"><button className="btn ghost sm">This week</button><button className="btn sm" onClick={() => setQr(true)}>Show counter QR</button></div>
        </div>
        {nav !== 'Overview' ? <div className="card">{nav} — coming next (see MVP roadmap).</div> : (<>
          <div className="grid4">
            <Stat l="Total customers" v="412" s="+93 new this week" g/>
            <Stat l="Repeat visit rate" v="69%" s="209 of 302 visits were returning"/>
            <Stat l="Points issued" v="12,400" s="This week" y/>
            <Stat l="Points redeemed" v="3,150" s="31 rewards claimed" y/>
          </div>
          <div className="grid2">
            <div className="card">
              <div className="row"><h3>Visits this week</h3><span className="small muted"><i className="dot o"/> Returning <i className="dot y"/> New</span></div>
              <div className="chart">{VISITS.map(([d, total, ret]) => (<div key={d} className="colm"><small>{total}</small>
                  <div className="stack" style={{ height: total * 2.6 }}><i className="n" style={{ flex: total - ret }}/><i className="r" style={{ flex: ret }}/></div>
                  <small className="muted">{d}</small></div>))}</div>
              <p className="small">Saturday is your busiest day. A "double points" offer on Tuesday could fill your slowest day.</p>
            </div>
            <div className="card"><h3>Top regulars</h3>
              {REGULARS.map(([p, v, pts], i) => <div className="row item" key={p}><span className="rank">{i + 1}</span>
                <div className="grow"><b>{p}</b><div className="small muted">{v} visits</div></div><b>{pts} pts</b></div>)}</div>
          </div>
          <div className="grid2">
            <div className="card"><div className="row"><h3>Your rewards</h3><button className="btn sm" onClick={addReward}>+ Add reward</button></div>
              {rewards.map(r => <div className="row item" key={r.id}><div className="grow"><b>{r.name}</b>
                <div className="small muted">{r.pts} points · claimed {r.claimed} times</div></div>
                <button className={'tog' + (r.on ? ' on' : '')} onClick={() => toggle(r.id)} aria-label="toggle"><i /></button></div>)}</div>
            <div className="card"><h3>Recent redemptions</h3>
              {REDEEMED.map(([i, n, p, t]) => <div className="row item" key={n + t}><div className="ico">{i}</div>
                <div className="grow"><b>{n}</b><div className="small muted">{p}</div></div><span className="small muted">{t}</span></div>)}
              <p className="small muted">Sample data shown for design preview.</p></div>
          </div></>)}
      </main>
      {qr && <div className="modal" onClick={() => setQr(false)}><div className="card c" onClick={e => e.stopPropagation()}>
        <h3>Counter QR</h3><div className="qr">▦</div><p className="muted small">Customers scan this to join {BUSINESS}</p>
        <button className="btn" onClick={() => setQr(false)}>Close</button></div></div>}
    </div>);
}
function Stat({ l, v, s, g, y }) {
    return <div className="card"><span className="muted small">{l}</span><div className={'pts' + (y ? ' y' : '')}>{v}</div><span className={'small ' + (g ? 'green' : 'muted')}>{s}</span></div>;
}
