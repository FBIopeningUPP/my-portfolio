import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Scene from './components/Scene'

export default function App() {
  const [currentRoom, setCurrentRoom] = useState('home')

  return (
    <div className="app-container">
      <div className="ui-layer">
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="interactive">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>MILIND.</h2>
            <div className="mono-tag" style={{ marginTop: '0.5rem', opacity: 0.6 }}>
              <span>◎</span> VIBE_SYNC
            </div>
          </div>
          
          <nav className="interactive" style={{ display: 'flex', gap: '0.5rem' }}>
            {['home', 'projects', 'skills', 'contact'].map((room) => (
              <button 
                key={room}
                className={`nav-btn ${currentRoom === room ? 'active' : ''}`}
                onClick={() => setCurrentRoom(room)}
              >
                {room}
              </button>
            ))}
          </nav>
        </header>

        <main className="interactive" style={{ maxWidth: '800px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRoom}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              
              {currentRoom === 'home' && (
                <div>
                  <h1 className="huge-text">HARDWARE</h1>
                  <h1 className="huge-text" style={{ color: 'transparent', WebkitTextStroke: '2px #111' }}>
                    ARCHITECT
                  </h1>
                  <p style={{ marginTop: '2rem', fontSize: '1.2rem', maxWidth: '400px', lineHeight: 1.5, fontWeight: 600 }}>
                    i design boards, write firmware, and make things blink. mostly avoiding magic smoke.
                  </p>
                </div>
              )}

              {currentRoom === 'projects' && (
                <div>
                  <h1 className="huge-text" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>STUFF I BUILT</h1>
                  <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    
                    <div style={{ border: '2px solid #111', padding: '1.5rem', background: '#fff' }}>
                      <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>H7 FLIGHT CONTROLLER</h3>
                      <p style={{ fontWeight: 600 }}>custom STM32H7 board for FPV drones. 4 layers, 120 parts.</p>
                      <div className="mono-tag" style={{ marginTop: '1rem', color: '#ff5000' }}>[ STM32 / KICAD / 24V ]</div>
                    </div>

                    <div style={{ border: '2px solid #111', padding: '1.5rem', background: '#fff' }}>
                      <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>QMK MACRO PAD</h3>
                      <p style={{ fontWeight: 600 }}>rotary encoders, oled screen, way too much rgb.</p>
                      <div className="mono-tag" style={{ marginTop: '1rem', color: '#ff5000' }}>[ ATMEGA32U4 / C++ / USB ]</div>
                    </div>

                  </div>
                </div>
              )}

              {currentRoom === 'skills' && (
                <div>
                  <h1 className="huge-text" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>THE STACK</h1>
                  <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', fontWeight: 600, fontSize: '1.2rem' }}>
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
                  <p style={{ marginTop: '2rem', fontSize: '1.2rem', maxWidth: '400px', lineHeight: 1.5, fontWeight: 600 }}>
                    open for freelance, collabs, or just talking about crazy hardware ideas.
                  </p>
                  <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                    <a href="mailto:milindsingh486@gmail.com" className="nav-btn" style={{ textDecoration: 'none' }}>EMAIL</a>
                    <a href="https://github.com/FBIopeningUPP" target="_blank" className="nav-btn" style={{ textDecoration: 'none' }}>GITHUB</a>
                    <a href="https://www.linkedin.com/in/milind-singh486" target="_blank" className="nav-btn" style={{ textDecoration: 'none' }}>LINKEDIN</a>
                  </div>
                </div>
              )}
              
            </motion.div>
          </AnimatePresence>
        </main>

        <footer style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="mono-tag interactive">[ EST. 2026 ]</div>
          <div className="mono-tag interactive" style={{ color: '#ff5000' }}>DRAG TO SPIN</div>
        </footer>

      </div>

      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Scene room={currentRoom} />
      </div>
    </div>
  )
}