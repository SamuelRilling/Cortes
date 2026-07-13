'use client'

import { ChevronDown, FileSearch, Lightbulb } from 'lucide-react'

type FlowStep = {
  n: string
  q: string
  color: string
  items?: string[]
  desc?: string
  soft: string
  border: string
  hasItems: boolean
  hasDesc: boolean
}

type Props = {
  open: boolean
  onToggle: () => void
  accent: string
  title: string
  subtitle: string
  flowKey: string
  flowKeyDesc: string
  flow: FlowStep[]
}

export default function FlowSection({ open, onToggle, accent, title, subtitle, flowKey, flowKeyDesc, flow }: Props) {
  return (
    <section style={{
      maxWidth: '1280px', margin: 'clamp(28px,4vw,48px) auto 0',
      background: 'oklch(0.995 0.003 265)', border: '1px solid oklch(0.905 0.008 265)',
      borderRadius: '24px', padding: 'clamp(22px,3vw,34px)',
      boxShadow: '0 30px 60px -46px rgba(28,28,60,.35)',
    }}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'nowrap', margin: 0, padding: 0, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ flex: 'none', width: '48px', height: '48px', borderRadius: '13px', background: accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FileSearch size={23} />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 'clamp(18px,2.4vw,24px)', lineHeight: 1.1, color: 'oklch(0.24 0.03 265)' }}>{title}</div>
          <div style={{ fontSize: '13px', color: 'oklch(0.5 0.02 265)', marginTop: '4px' }}>{subtitle}</div>
        </div>
        <span style={{ flex: 'none', color: accent, display: 'flex', alignItems: 'center', transition: 'transform .4s cubic-bezier(.4,0,.2,1)', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <ChevronDown size={22} />
        </span>
      </button>

      <div style={{
        display: 'grid',
        gridTemplateRows: open ? '1fr' : '0fr',
        opacity: open ? 1 : 0,
        transition: 'grid-template-rows .45s cubic-bezier(.4,0,.2,1), opacity .4s ease',
      }}>
        <div style={{ overflow: 'hidden', minHeight: 0 }}>
          <div style={{ paddingTop: '24px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', gap: '10px' }}>
              {flow.map((f, i) => (
                <div key={i} style={{ flex: '1 1 180px', minWidth: '170px' }}>
                  <div style={{ height: '100%', border: `1px solid ${f.border}`, background: f.soft, borderRadius: '15px', padding: '16px 15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '10px' }}>
                      <span style={{ flex: 'none', width: '26px', height: '26px', borderRadius: '50%', background: f.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: '13px' }}>{f.n}</span>
                      <span style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: '12.5px', letterSpacing: '.02em', textTransform: 'uppercase', color: f.color, lineHeight: 1.15 }}>{f.q}</span>
                    </div>
                    {f.hasItems && (
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        {(f.items || []).map((it, j) => (
                          <li key={j} style={{ fontSize: '13px', color: 'oklch(0.4 0.02 265)', display: 'flex', gap: '7px', alignItems: 'baseline' }}>
                            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: f.color, flex: 'none', transform: 'translateY(-2px)' }} />
                            {it}
                          </li>
                        ))}
                      </ul>
                    )}
                    {f.hasDesc && (
                      <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.55, color: 'oklch(0.42 0.02 265)' }}>{f.desc}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap',
              borderRadius: '16px', padding: '20px 22px',
              background: `linear-gradient(120deg, color-mix(in oklab, ${accent}, white 90%), color-mix(in oklab, ${accent}, white 96%))`,
              border: `1px solid color-mix(in oklab, ${accent}, white 80%)`,
            }}>
              <span style={{ flex: 'none', width: '42px', height: '42px', borderRadius: '12px', background: accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Lightbulb size={21} />
              </span>
              <div style={{ flex: 1, minWidth: '240px' }}>
                <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: '12px', letterSpacing: '.16em', textTransform: 'uppercase', color: accent }}>Idea clave</div>
                <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 'clamp(16px,2vw,21px)', color: 'oklch(0.26 0.03 265)', marginTop: '6px', lineHeight: 1.25 }}>{flowKey}</div>
                <p style={{ margin: '8px 0 0', fontSize: '13.5px', lineHeight: 1.55, color: 'oklch(0.42 0.02 265)' }}>{flowKeyDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
