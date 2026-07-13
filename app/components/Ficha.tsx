'use client'

import { BookOpen, ChevronDown, CornerDownLeft, CornerUpRight, MapPin, Scale, Users } from 'lucide-react'

type Plazo = { r: string; t: string }

type Props = {
  open: boolean
  onToggle: () => void
  accent: string
  soft: string
  bd: string
  plazos?: Plazo[]
  hasPlazos: boolean
  quorum?: string
  hasQuorum: boolean
  recibe?: string
  hasRecibe: boolean
  deriva?: string
  hasDeriva: boolean
  territorial?: string
  hasTerr: boolean
  base?: string
  hasBase: boolean
}

export default function Ficha({ open, onToggle, accent, soft, bd, plazos, hasPlazos, quorum, hasQuorum, recibe, hasRecibe, deriva, hasDeriva, territorial, hasTerr, base, hasBase }: Props) {
  return (
    <section style={{
      maxWidth: '1280px', margin: 'clamp(20px,3vw,32px) auto 0',
      background: soft, border: `1px solid ${bd}`, borderRadius: '20px',
      padding: 'clamp(18px,2.4vw,26px)',
      transition: 'background-color .45s ease, border-color .45s ease',
    }}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', margin: 0, padding: 0, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ flex: 'none', width: '34px', height: '34px', borderRadius: '10px', background: accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BookOpen size={17} />
        </span>
        <div style={{ flex: 1, fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 'clamp(15px,1.8vw,18px)', color: 'oklch(0.26 0.03 265)' }}>Ficha de referencia</div>
        <span style={{ flex: 'none', color: accent, display: 'flex', alignItems: 'center', transition: 'transform .4s cubic-bezier(.4,0,.2,1)', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <ChevronDown size={20} />
        </span>
      </button>

      <div style={{
        display: 'grid',
        gridTemplateRows: open ? '1fr' : '0fr',
        opacity: open ? 1 : 0,
        transition: 'grid-template-rows .45s cubic-bezier(.4,0,.2,1), opacity .4s ease',
      }}>
        <div style={{ overflow: 'hidden', minHeight: 0 }}>
          <div style={{ paddingTop: '16px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'flex-start' }}>

              {hasPlazos && (
                <div style={{ flex: '1 1 300px', minWidth: '260px', background: '#fff', border: `1px solid ${bd}`, borderRadius: '14px', padding: '15px 16px' }}>
                  <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: '11.5px', letterSpacing: '.1em', textTransform: 'uppercase', color: accent, marginBottom: '10px' }}>Plazos clave</div>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                    {(plazos || []).map((p, i) => (
                      <li key={i} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: '13px', color: 'oklch(0.3 0.03 265)' }}>{p.r}</span>
                        <span style={{ fontSize: '12.5px', lineHeight: 1.45, color: 'oklch(0.46 0.02 265)' }}>{p.t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div style={{ flex: '1 1 300px', minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {hasRecibe && (
                  <div style={{ background: '#fff', border: `1px solid ${bd}`, borderRadius: '14px', padding: '13px 15px' }}>
                    <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: '11px', letterSpacing: '.09em', textTransform: 'uppercase', color: accent, marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CornerDownLeft size={14} />Recibe
                    </div>
                    <p style={{ margin: 0, fontSize: '12.5px', lineHeight: 1.5, color: 'oklch(0.42 0.02 265)' }}>{recibe}</p>
                  </div>
                )}
                {hasDeriva && (
                  <div style={{ background: '#fff', border: `1px solid ${bd}`, borderRadius: '14px', padding: '13px 15px' }}>
                    <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: '11px', letterSpacing: '.09em', textTransform: 'uppercase', color: accent, marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CornerUpRight size={14} />Deriva
                    </div>
                    <p style={{ margin: 0, fontSize: '12.5px', lineHeight: 1.5, color: 'oklch(0.42 0.02 265)' }}>{deriva}</p>
                  </div>
                )}
              </div>

              <div style={{ flex: '1 1 300px', minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {hasQuorum && (
                  <div style={{ background: '#fff', border: `1px solid ${bd}`, borderRadius: '14px', padding: '13px 15px' }}>
                    <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: '11px', letterSpacing: '.09em', textTransform: 'uppercase', color: accent, marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Users size={14} />Integración / quórum
                    </div>
                    <p style={{ margin: 0, fontSize: '12.5px', lineHeight: 1.5, color: 'oklch(0.42 0.02 265)' }}>{quorum}</p>
                  </div>
                )}
                {hasTerr && (
                  <div style={{ background: '#fff', border: `1px solid ${bd}`, borderRadius: '14px', padding: '13px 15px' }}>
                    <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: '11px', letterSpacing: '.09em', textTransform: 'uppercase', color: accent, marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={14} />Competencia territorial
                    </div>
                    <p style={{ margin: 0, fontSize: '12.5px', lineHeight: 1.5, color: 'oklch(0.42 0.02 265)' }}>{territorial}</p>
                  </div>
                )}
              </div>
            </div>

            {hasBase && (
              <div style={{ marginTop: '14px', fontSize: '12px', color: 'oklch(0.52 0.02 265)', display: 'flex', alignItems: 'center', gap: '7px' }}>
                <Scale size={14} />
                <span><strong style={{ fontWeight: 600 }}>Base legal:</strong> {base}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
