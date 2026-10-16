import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Scene from './components/Scene'

export default function App() {
  const [currentRoom, setCurrentRoom] = useState('home')

  const playClick = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext) ()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'square'
    osc.frequency.setValueAtTime(150, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.05)
    gain.gain.setValueAtTime(0.1, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)
    osc.start()
    osc.stop(ctx.currentTime + 0.05)
  }

  const playHover = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(300, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.03)
    gain.gain.setValueAtTime(0.02, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03)
    osc.start()
    osc.stop(ctx.currentTime + 0.03)
  }

  const handleNav = (room) => {
    playClick()
    setCurrentRoom(room)
  }

  return (
    <div className="app-container" onContextMenu={(e) => e.preventDefault()}>
      <div className="ui-layer">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="interactive">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>MILIND.</h2>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '0.5rem' }}>
              <div className="mono-tag" style={{ opacity: 0.6 }}>
                <span>◎</span> type shit
              </div>
              <a 
                href="https://github.com/FBIopeningUPP/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mono-tag"
                style={{ opacity: 0.8 }}
                onMouseEnter={playHover}
              >
                GH ↗
              </a>
              <a 
                href="https://www.linkedin.com/in/milind-singh486/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mono-tag"
                style={{ opacity: 0.8 }}
                onMouseEnter={playHover}
              >
                IN ↗
              </a>
            </div>
          </div>
          
          <nav className="interactive" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['home', 'projects', 'skills', 'contact'].map((room) => (
              <button 
                key={room}
                className={`nav-btn ${currentRoom === room ? 'active' : ''}`}
                onClick={() => handleNav(room)}
                onMouseEnter={playHover}
              >
                {room}
              </button>
            ))}
          </nav>
        </header>

        <main className="interactive scroll-area" style={{ maxWidth: '800px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRoom}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              
              {currentRoom === 'home' && (
                <div style={{position: 'relative'}}>
                  <div style={{
                    position: 'absolute',
                    top: '40%', left: '20%',
                    transform: 'translate(-50%, -50%)',
                    width: '350px', height: '350px',
                    background: 'rgba(0, 200, 250, 0.15)',
                    filter: 'blur(80px)',
                    zIndex: -1, 
                    pointerEvents: 'none'
                  }}/>
                  <h1 className='huge-text glitch-text'>HARDWARE</h1>
                  <h1 className='huge-text glitch-text' style={{color: 'transparent', WebkitTextStroke: '2px #111'}}>
                    ARCHITECT
                  </h1>
                  <p style={{ marginTop: '2rem', fontSize: '1.2rem', maxWidth: '440px', lineHeight: 1.5, fontWeight: 600 }}>
                    i design boards, write firmware, and make things blink. mostly avoiding magic smoke.
                  </p>
                  <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button 
                      className="nav-btn active"
                      onClick={() => handleNav('projects')}
                      onMouseEnter={playHover}
                    >
                      EXPLORE WORK →
                    </button>
                    <a 
                      href="https://github.com/FBIopeningUPP/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="nav-btn" 
                      style={{ textDecoration: 'none' }}
                      onMouseEnter={playHover}
                    >
                      GITHUB ↗
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/milind-singh486/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="nav-btn" 
                      style={{ textDecoration: 'none' }}
                      onMouseEnter={playHover}
                    >
                      LINKEDIN ↗
                    </a>
                  </div>
                </div>
              )}

              {currentRoom === 'projects' && (
                <div>
                  <h1 className="huge-text" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>STUFF I BUILT</h1>
                  <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    
                    <div style={{ border: '2px solid #111', padding: '1.5rem', background: '#fff' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div>
                          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>ChromaDeck</h3>
                          <p style={{ fontWeight: 600 }}>hardware macro pad and control surface.</p>
                        </div>
                        <a 
                          href="https://github.com/FBIopeningUPP/ChromaDeck" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mono-tag"
                          style={{ textDecoration: 'none', color: '#ff5000' }}
                          onMouseEnter={playHover}
                        >
                          GITHUB ↗
                        </a>
                      </div>
                      <div className="mono-tag" style={{ marginTop: '1rem', color: '#ff5000' }}>[ PCB DESIGN / C++ / USB ]</div>
                    </div>

                    <div style={{ border: '2px solid #111', padding: '1.5rem', background: '#fff' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div>
                          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Checkout</h3>
                          <p style={{ fontWeight: 600 }}>2D top-down supermarket management game.</p>
                        </div>
                        <a 
                          href="https://github.com/FBIopeningUPP/Checkout" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mono-tag"
                          style={{ textDecoration: 'none', color: '#ff5000' }}
                          onMouseEnter={playHover}
                        >
                          GITHUB ↗
                        </a>
                      </div>
                      <div className="mono-tag" style={{ marginTop: '1rem', color: '#ff5000' }}>[ GAME DEV / LOGIC ]</div>
                    </div>

                    <div style={{ border: '2px solid #111', padding: '1.5rem', background: '#fff' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div>
                          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Tower-Zero & AirCade</h3>
                          <p style={{ fontWeight: 600 }}>various hardware and software experiments.</p>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                        <a 
                          href="https://github.com/FBIopeningUPP/Tower-Zero" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mono-tag"
                          style={{ textDecoration: 'none', color: '#ff5000' }}
                          onMouseEnter={playHover}
                        >
                          TOWER-ZERO ↗
                        </a>
                        <a 
                          href="https://github.com/FBIopeningUPP/AirCade" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mono-tag"
                          style={{ textDecoration: 'none', color: '#ff5000' }}
                          onMouseEnter={playHover}
                        >
                          AIRCADE ↗
                        </a>
                        </div>
                      </div>
                      <div className="mono-tag" style={{ marginTop: '1rem', color: '#ff5000' }}>[ PROTOTYPING / C++ ]</div>
                    </div>

                  </div>
                </div>
              )}

              {currentRoom === 'skills' && (
                <div>
                  <h1 className="huge-text" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>THE STACK</h1>
                  <div className="stack-grid" style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', fontWeight: 600, fontSize: '1.2rem' }}>
                    <div>
                      <h3 style={{ color: '#ff5000', marginBottom: '1rem' }}>HARDWARE</h3>
                      <p>kicad</p>
                      <p>altium</p>
                      <p>fusion 360</p>
                      <p>rf design</p>
                    </div>
                    <div>
                      <h3 style={{ color: '#ff5000', marginBottom: '1rem' }}>FIRMWARE</h3>
                      <p>c / c++</p>
                      <p>stm32 hal</p>
                      <p>freertos</p>
                      <p>esp-idf</p>
                    </div>
                  </div>
                </div>
              )}

              {currentRoom === 'contact' && (
                <div>
                  <h1 className="huge-text" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>HIT ME UP</h1>
                  <p style={{ marginTop: '2rem', fontSize: '1.2rem', maxWidth: '440px', lineHeight: 1.5, fontWeight: 600 }}>
                    open for freelance, collabs, or just talking about crazy hardware ideas.
                  </p>
                  <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', maxWidth: '440px' }}>
                    <a 
                      href="mailto:milindsingh486@gmail.com" 
                      className="nav-btn" 
                      style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      onMouseEnter={playHover}
                    >
                      <span>EMAIL</span>
                      <span className="mono-tag" style={{ fontSize: '0.75rem' }}>milindsingh486@gmail.com ↗</span>
                    </a>
                    <a 
                      href="https://github.com/FBIopeningUPP/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="nav-btn" 
                      style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      onMouseEnter={playHover}
                    >
                      <span>GITHUB</span>
                      <span className="mono-tag" style={{ fontSize: '0.75rem' }}>/FBIopeningUPP ↗</span>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/milind-singh486/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="nav-btn" 
                      style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      onMouseEnter={playHover}
                    >
                      <span>LINKEDIN</span>
                      <span className="mono-tag" style={{ fontSize: '0.75rem' }}>/in/milind-singh486 ↗</span>
                    </a>
                  </div>
                </div>
              )}
              
            </motion.div>
          </AnimatePresence>
        </main>

        <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'auto', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="mono-tag">[ EST. 2026 ]</div>
            <a 
              href="https://github.com/FBIopeningUPP/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mono-tag" 
              style={{ textDecoration: 'none' }}
              onMouseEnter={playHover}
            >
              GH ↗
            </a>
            <a 
              href="https://www.linkedin.com/in/milind-singh486/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mono-tag" 
              style={{ textDecoration: 'none' }}
              onMouseEnter={playHover}
            >
              IN ↗
            </a>
          </div>
          <div className="mono-tag" style={{ color: '#ff5000' }}>DRAG TO SPIN</div>
        </footer>
      </div>

      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Scene room={currentRoom} />
      </div>
    </div>
  )
}