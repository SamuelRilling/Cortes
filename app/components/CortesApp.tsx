'use client'

import { useState, useMemo } from 'react'
import { TIERS, META, PRIMARY_TIERS, SECONDARY_TIERS } from '../data'
import NavCard, { NavCardData } from './NavCard'
import Ficha from './Ficha'
import FlowSection from './FlowSection'

const NB = 'oklch(0.9 0.012 265)'

function node(c: string, a: boolean) {
  return {
    bg: a ? `color-mix(in oklab, ${c}, white 88%)` : '#ffffff',
    bd: a ? c : NB,
    bw: a ? '1.6px' : '1px',
    fg: a ? `color-mix(in oklab, ${c}, black 30%)` : 'oklch(0.32 0.02 265)',
    sub: a ? `color-mix(in oklab, ${c}, black 6%)` : 'oklch(0.55 0.015 265)',
    iconBg: a ? c : `color-mix(in oklab, ${c}, white 88%)`,
    iconFg: a ? '#ffffff' : c,
    sh: a ? `0 12px 28px -16px ${c}` : '0 1px 2px rgba(30,30,60,.05)',
    caretColor: a ? c : 'oklch(0.62 0.02 265)',
  }
}

type NavRowOpts = {
  color: string; icon: string; name: string; kicker?: string; active: boolean;
  desc?: string; subs?: string[]; groups?: { label: string; subs: string[] }[];
  descInline?: boolean; tag?: string;
  onClick: () => void
}

function navRow(o: NavRowOpts): NavCardData {
  const nd = node(o.color, o.active)
  const multi = !!(o.subs && o.subs.length)
  const hasGroups = !!(o.groups && o.groups.length)
  const hasDesc = !!o.desc
  const gcount = hasGroups ? (o.groups || []).reduce((a, g) => a + (g.subs ? g.subs.length : 0), 0) : 0
  return {
    icon: o.icon, name: o.name, kicker: o.kicker || '', hasKicker: !!o.kicker,
    tag: o.tag || '',
    hasTag: !!o.tag,
    tagColor: `color-mix(in oklab, ${o.color}, white 25%)`,
    onClick: o.onClick,
    caretRot: o.active ? 'translateX(3px)' : 'none',
    tf: o.active ? 'translateY(-3px)' : 'none',
    iconTf: o.active ? 'scale(1.06)' : 'none',
    bg: nd.bg, bd: nd.bd, bw: nd.bw, fg: nd.fg, sub: nd.sub,
    iconBg: nd.iconBg, iconFg: nd.iconFg, sh: nd.sh, caretColor: nd.caretColor,
    color: o.color,
    showInlineDesc: !!(o.active && hasDesc && !multi && o.descInline),
    showDescSide: !!(o.active && hasDesc && !multi && !o.descInline),
    showSide: !!(o.active && (multi || hasGroups || (hasDesc && !o.descInline))),
    showSubs: !!(o.active && multi),
    showGroups: !!(o.active && hasGroups),
    groups: (o.groups || []).map((g, gi) => ({
      label: g.label,
      subs: (g.subs || []).map((t, i) => ({ text: t, delay: ((gi * 0.1) + (i * 0.06)).toFixed(2) + 's' })),
    })),
    descText: o.desc || '',
    descColor: `color-mix(in oklab, ${o.color}, black 26%)`,
    subs: (o.subs || []).map((t, i) => ({ text: t, delay: (i * 0.06).toFixed(2) + 's' })),
    chipBg: '#ffffff',
    chipBd: `color-mix(in oklab, ${o.color}, white 68%)`,
    chipFg: `color-mix(in oklab, ${o.color}, black 28%)`,
  }
}

export default function CortesApp({ tintStrength = 11, accent = 'oklch(0.3 0.05 265)', showFlow = true }: {
  tintStrength?: number
  accent?: string
  showFlow?: boolean
}) {
  const [tier, setTier] = useState('cs')
  const [otrosOpen, setOtrosOpen] = useState(false)
  const [openTop, setOpenTop] = useState<string>('salas')
  const [openSala, setOpenSala] = useState<string | null>(null)
  const [openMateria, setOpenMateria] = useState<number | null>(null)
  const [openPlenoItem, setOpenPlenoItem] = useState<number | null>(null)
  const [openBottom, setOpenBottom] = useState<string | null>(null)

  function switchTier(id: string) {
    const isPrimary = PRIMARY_TIERS.includes(id)
    setTier(id)
    setOtrosOpen(!isPrimary)
    setOpenTop('salas')
    setOpenSala(null)
    setOpenMateria(null)
    setOpenPlenoItem(null)
    setOpenBottom(null)
  }

  function toggleTop(id: string) {
    setOpenTop(prev => prev === id ? '' : id)
    setOpenSala(null)
    setOpenMateria(null)
    setOpenPlenoItem(null)
  }

  function toggleSala(id: string) {
    setOpenSala(prev => prev === id ? null : id)
    setOpenMateria(null)
  }

  function toggleMateria(i: number) {
    setOpenMateria(prev => prev === i ? null : i)
  }

  function togglePlenoItem(i: number) {
    setOpenPlenoItem(prev => prev === i ? null : i)
  }

  function toggleBottom(which: string) {
    setOpenBottom(prev => prev === which ? null : which)
  }

  const D = TIERS[tier] || TIERS.cs
  const M = META[tier] || {}

  const openPleno = openTop === 'pleno'
  const openSalas = openTop === 'salas'

  const plenoHasItems = !!(D.pleno?.items?.length)
  const plenoHasSubs = !!(D.pleno?.subs?.length)
  const hasPleno = plenoHasItems || plenoHasSubs

  // build columns
  const columns = useMemo(() => {
    const cols: { rows: NavCardData[] }[] = []

    // col 1
    const col1rows: NavCardData[] = []
    if (hasPleno) {
      col1rows.push(navRow({
        color: D.pleno.color, icon: D.pleno.icon,
        name: D.pleno.subtitle || 'Tribunal Pleno',
        kicker: PRIMARY_TIERS.includes(tier) ? (tier === 'cs' ? 'Órgano superior' : 'Las cortes') : undefined,
        active: openPleno,
        subs: plenoHasSubs ? D.pleno.subs : undefined,
        onClick: () => toggleTop('pleno'),
      }))
    }
    col1rows.push(navRow({
      color: D.salasHeader.color, icon: D.salasHeader.icon,
      name: D.salasHeader.subtitle || 'Salas Especializadas',
      active: openSalas,
      onClick: () => toggleTop('salas'),
    }))
    cols.push({ rows: col1rows })

    // col 2
    if (openPleno && plenoHasItems) {
      cols.push({
        rows: (D.pleno.items || []).map((it, i) => navRow({
          color: D.pleno.color, icon: it.icon, name: it.title,
          active: openPlenoItem === i, desc: it.desc,
          subs: it.subs, descInline: false,
          onClick: () => togglePlenoItem(i),
        })),
      })
    } else if (openSalas) {
      cols.push({
        rows: D.salas.map(sa => navRow({
          color: sa.color, icon: sa.icon, name: sa.short, kicker: sa.kicker,
          active: openSala === sa.id, desc: sa.summary, descInline: true,
          onClick: () => toggleSala(sa.id),
        })),
      })
    }

    // col 3
    if (openSalas && openSala) {
      const sa = D.salas.find(x => x.id === openSala)
      if (sa) {
        cols.push({
          rows: sa.materias.map((m, i) => {
            const multi = !!(m.subs?.length)
            const grp = !!(m.groups?.length)
            const gcount = grp ? (m.groups || []).reduce((a, g) => a + (g.subs?.length || 0), 0) : 0
            return navRow({
              color: sa.color, icon: m.icon, name: m.name,
              tag: multi ? `${m.subs!.length} temas` : (grp ? `${gcount} temas` : ''),
              active: openMateria === i, desc: m.desc, subs: m.subs, groups: m.groups,
              onClick: () => toggleMateria(i),
            })
          }),
        })
      }
    }

    return cols
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tier, openPleno, openSalas, openSala, openMateria, openPlenoItem])

  // colors
  let activeColor: string | null = null
  if (openSalas) {
    const sa = D.salas.find(x => x.id === openSala)
    activeColor = sa ? sa.color : D.salasHeader.color
  } else if (openPleno) {
    activeColor = D.pleno.color
  }

  const strength = Math.max(3, Math.min(28, tintStrength))
  const pageBg = activeColor || 'oklch(0.975 0.005 265)'
  const canvasTint = activeColor ? `color-mix(in oklab, ${activeColor}, white ${100 - strength}%)` : 'oklch(0.995 0.003 265)'
  const canvasBd = activeColor ? `color-mix(in oklab, ${activeColor}, white 74%)` : 'oklch(0.905 0.008 265)'

  const onColor = !!activeColor
  const headerFg = onColor ? 'rgba(255,255,255,.94)' : 'oklch(0.5 0.03 265)'

  // ficha
  const fichaObj = M.ficha || null
  const fichaHasPlazos = !!(fichaObj?.plazos?.length)
  const fichaIsOpen = openBottom === 'ficha'

  // flow
  const flowIsOpen = openBottom === 'flow'
  const flowSteps = (D.flow || []).map(f => ({
    ...f,
    hasItems: !!(f.items?.length), items: f.items || [],
    hasDesc: !!f.desc, desc: f.desc || '',
    soft: `color-mix(in oklab, ${f.color}, white 92%)`,
    border: `color-mix(in oklab, ${f.color}, white 76%)`,
  }))
  const showFlowSection = showFlow && flowSteps.length > 0

  const effectiveAccent = accent || 'oklch(0.3 0.05 265)'

  // tabs
  const tabs = PRIMARY_TIERS.map(id => {
    const active = tier === id
    const dim = !PRIMARY_TIERS.includes(tier)
    const AC = activeColor || 'oklch(0.52 0.15 300)'
    return {
      id, label: TIERS[id]?.title || id, active,
      bg: active ? `color-mix(in oklab, ${AC}, white 82%)` : '#ffffff',
      bd: active ? AC : 'oklch(0.9 0.012 265)',
      fg: active ? `color-mix(in oklab, ${AC}, black 34%)` : (dim ? 'oklch(0.72 0.015 265)' : 'oklch(0.5 0.02 265)'),
      fw: active ? '600' : '500',
      op: dim ? '0.6' : '1',
    }
  })

  const subtabs = otrosOpen ? SECONDARY_TIERS.map(id => {
    const active = tier === id
    const AC = activeColor || 'oklch(0.52 0.15 300)'
    return {
      id, label: TIERS[id]?.title || id, active,
      bg: active ? `color-mix(in oklab, ${AC}, white 86%)` : 'transparent',
      bd: active ? AC : 'oklch(0.9 0.012 265)',
      fg: active ? `color-mix(in oklab, ${AC}, black 30%)` : 'oklch(0.55 0.02 265)',
      fw: active ? '600' : '500',
    }
  }) : []

  return (
    <div style={{
      fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
      color: 'oklch(0.28 0.03 265)',
      minHeight: '100vh',
      padding: 'clamp(20px,4vw,54px) clamp(16px,4vw,40px)',
      backgroundColor: pageBg,
      transition: 'background-color .6s ease',
    }}>
      {/* central canvas */}
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        background: canvasTint, border: `1px solid ${canvasBd}`, borderRadius: '28px',
        padding: 'clamp(24px,3.4vw,44px)',
        boxShadow: '0 40px 80px -50px rgba(28,28,60,.45), 0 2px 8px -4px rgba(28,28,60,.06)',
        transition: 'background-color .6s ease, border-color .6s ease',
      }}>

        {/* tier tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => switchTier(tab.id)}
              style={{
                fontFamily: "'Space Grotesk'", fontSize: '15px', fontWeight: tab.fw as number,
                letterSpacing: '-0.01em', padding: '11px 22px', borderRadius: '999px', cursor: 'pointer',
                opacity: parseFloat(tab.op), background: tab.bg, border: `1.6px solid ${tab.bd}`,
                color: tab.fg, transition: 'all .35s cubic-bezier(.4,0,.2,1)',
              }}
            >{tab.label}</button>
          ))}
          <span style={{ width: '1px', height: '20px', background: 'oklch(0.9 0.012 265)', margin: '0 2px' }} />
          <button
            onClick={() => setOtrosOpen(o => !o)}
            style={{
              fontFamily: "'Space Grotesk'", fontSize: '13.5px', fontWeight: 500, letterSpacing: '-0.01em',
              padding: '9px 16px', borderRadius: '999px', cursor: 'pointer',
              background: 'transparent', border: '1px dashed oklch(0.82 0.015 265)',
              color: 'oklch(0.55 0.02 265)', transition: 'all .35s cubic-bezier(.4,0,.2,1)',
            }}
          >Otros tribunales {otrosOpen ? '▴' : '▾'}</button>
        </div>

        {/* secondary tabs */}
        {otrosOpen && (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px', marginBottom: '6px', paddingTop: '2px' }}>
            {subtabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => switchTier(tab.id)}
                style={{
                  fontFamily: "'Space Grotesk'", fontSize: '13px', fontWeight: tab.fw as number,
                  letterSpacing: '-0.01em', padding: '7px 15px', borderRadius: '999px', cursor: 'pointer',
                  background: tab.bg, border: `1.3px solid ${tab.bd}`, color: tab.fg,
                  transition: 'all .3s cubic-bezier(.4,0,.2,1)',
                }}
              >{tab.label}</button>
            ))}
          </div>
        )}

        {/* title + desc */}
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h1 style={{
            textAlign: 'center', fontFamily: "'Space Grotesk'", fontWeight: 700,
            fontSize: 'clamp(28px,4.4vw,42px)', lineHeight: 1.05, letterSpacing: '-0.02em',
            margin: 0, color: 'oklch(0.24 0.03 265)',
          }}>{D.title}</h1>
          <p style={{
            fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
            margin: '12px 0 0', fontSize: 'clamp(15px,1.5vw,17px)', lineHeight: 1.6,
            color: 'oklch(0.46 0.02 265)',
          }}>{D.root.desc}</p>
        </div>

        {/* columns */}
        <div style={{ display: 'flex', flexWrap: 'wrap', overflowX: 'hidden', gap: '14px', alignItems: 'flex-start', marginTop: '14px', padding: '4px 2px 10px' }}>
          {columns.map((col, ci) => (
            <div
              key={ci}
              style={{
                flex: '0 1 auto', minWidth: '252px', maxWidth: '100%',
                display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start',
                animation: 'colIn .4s cubic-bezier(.4,0,.2,1) both',
              }}
            >
              {col.rows.map((row, ri) => (
                <NavCard key={ri} row={row} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ficha */}
      {fichaObj && (
        <Ficha
          open={fichaIsOpen}
          onToggle={() => toggleBottom('ficha')}
          accent={activeColor || effectiveAccent}
          soft={`color-mix(in oklab, ${activeColor || effectiveAccent}, white 94%)`}
          bd={`color-mix(in oklab, ${activeColor || effectiveAccent}, white 82%)`}
          hasPlazos={fichaHasPlazos}
          plazos={fichaObj.plazos}
          hasQuorum={!!fichaObj.quorum}
          quorum={fichaObj.quorum}
          hasRecibe={!!fichaObj.recibe}
          recibe={fichaObj.recibe}
          hasDeriva={!!fichaObj.deriva}
          deriva={fichaObj.deriva}
          hasTerr={!!fichaObj.territorial}
          territorial={fichaObj.territorial}
          hasBase={!!fichaObj.base}
          base={fichaObj.base}
        />
      )}

      {/* flow */}
      {showFlowSection && (
        <FlowSection
          open={flowIsOpen}
          onToggle={() => toggleBottom('flow')}
          accent={effectiveAccent}
          title={M.flowTitle || '¿Cómo ingresa una causa?'}
          subtitle={M.flowSubtitle || 'La ruta que sigue cada asunto, paso a paso.'}
          flowKey={M.flowKey || ''}
          flowKeyDesc={M.flowKeyDesc || ''}
          flow={flowSteps}
        />
      )}
    </div>
  )
}
