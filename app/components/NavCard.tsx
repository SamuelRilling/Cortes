'use client'

import { icons, LucideProps } from 'lucide-react'
import React from 'react'

function LucideIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = icons[name as keyof typeof icons]
  if (!Icon) return null
  return <Icon {...props} />
}

type Sub = { text: string; delay: string }
type Group = { label: string; subs: Sub[] }

export type NavCardData = {
  icon: string
  name: string
  kicker?: string
  hasKicker: boolean
  tag?: string
  hasTag: boolean
  tagColor: string
  onClick: () => void
  caretRot: string
  tf: string
  iconTf: string
  bg: string
  bd: string
  bw: string
  fg: string
  sub: string
  iconBg: string
  iconFg: string
  sh: string
  caretColor: string
  color: string
  showInlineDesc: boolean
  showDescSide: boolean
  showSide: boolean
  showSubs: boolean
  showGroups: boolean
  groups: Group[]
  descText: string
  descColor: string
  subs: Sub[]
  chipBg: string
  chipBd: string
  chipFg: string
}

export default function NavCard({ row }: { row: NavCardData }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '12px', maxWidth: '100%' }}>
      <button
        onClick={row.onClick}
        style={{
          flex: 'none',
          width: '252px',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',
          cursor: 'pointer',
          background: row.bg,
          border: `${row.bw} solid ${row.bd}`,
          borderRadius: '14px',
          padding: '12px 13px',
          boxShadow: row.sh,
          transform: row.tf,
          transition: 'transform .5s cubic-bezier(.22,1,.36,1), box-shadow .5s cubic-bezier(.22,1,.36,1), background-color .45s ease, border-color .45s ease',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '11px', width: '100%' }}>
          <span style={{
            flex: 'none', width: '38px', height: '38px', borderRadius: '10px',
            background: row.iconBg, color: row.iconFg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px',
            transition: 'background-color .45s ease, color .45s ease, transform .5s cubic-bezier(.22,1,.36,1)',
            transform: row.iconTf,
          }}>
            <LucideIcon name={toPascal(row.icon)} size={18} />
          </span>
          <span style={{ flex: 1, minWidth: 0 }}>
            {row.hasKicker && (
              <span style={{
                display: 'block', fontFamily: "'Space Grotesk'", fontWeight: 500, fontSize: '10px',
                letterSpacing: '.12em', textTransform: 'uppercase', color: row.sub,
              }}>{row.kicker}</span>
            )}
            <span style={{ display: 'block', fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: '14.5px', lineHeight: 1.2, color: row.fg }}>{row.name}</span>
          </span>
          {row.hasTag && (
            <span style={{ flex: 'none', fontSize: '10.5px', fontWeight: 600, color: row.tagColor, fontFamily: "'Space Grotesk'" }}>{row.tag}</span>
          )}
          <span style={{ flex: 'none', color: row.caretColor, fontSize: '17px', transition: 'transform .45s cubic-bezier(.22,1,.36,1)', transform: row.caretRot, display: 'flex' }}>
            <LucideIcon name="ChevronRight" size={17} />
          </span>
        </span>
        {row.showInlineDesc && (
          <span style={{
            display: 'block', marginTop: '11px', paddingTop: '11px',
            borderTop: `1px solid ${row.bd}`,
            fontFamily: "'IBM Plex Sans'", fontSize: '12.5px', lineHeight: 1.55, color: row.descColor,
          }}>{row.descText}</span>
        )}
      </button>

      {row.showSide && (
        <div style={{ flex: '0 1 380px', width: '380px', maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '7px', paddingTop: '2px' }}>
          {row.showSubs && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {row.subs.map((sub, i) => (
                <span key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '9px',
                  background: row.chipBg, border: `1px solid ${row.chipBd}`, color: row.chipFg,
                  fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: '13px', lineHeight: 1.2,
                  padding: '11px 14px', borderRadius: '13px', whiteSpace: 'nowrap',
                  boxShadow: '0 1px 2px rgba(30,30,60,.05)',
                  animation: 'chipIn .42s cubic-bezier(.22,1,.36,1) both',
                  animationDelay: sub.delay,
                }}>
                  <span style={{ flex: 'none', width: '6px', height: '6px', borderRadius: '50%', background: row.color }} />
                  {sub.text}
                </span>
              ))}
            </div>
          )}
          {row.showGroups && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {row.groups.map((grp, gi) => (
                <div key={gi} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '7px', fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase', color: row.chipFg, opacity: 0.8 }}>
                    <span style={{ flex: 'none', width: '14px', height: '2px', borderRadius: '2px', background: row.color }} />
                    {grp.label}
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', paddingLeft: '2px' }}>
                    {grp.subs.map((sub, i) => (
                      <span key={i} style={{
                        display: 'inline-flex', alignItems: 'center', gap: '9px',
                        background: row.chipBg, border: `1px solid ${row.chipBd}`, color: row.chipFg,
                        fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: '13px', lineHeight: 1.2,
                        padding: '10px 13px', borderRadius: '13px', whiteSpace: 'nowrap',
                        boxShadow: '0 1px 2px rgba(30,30,60,.05)',
                        animation: 'chipIn .42s cubic-bezier(.22,1,.36,1) both',
                        animationDelay: sub.delay,
                      }}>
                        <span style={{ flex: 'none', width: '6px', height: '6px', borderRadius: '50%', background: row.color }} />
                        {sub.text}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {row.showDescSide && (
            <span style={{
              display: 'block', background: row.chipBg, border: `1px solid ${row.chipBd}`, color: row.descColor,
              fontFamily: "'IBM Plex Sans'", fontSize: '12.5px', lineHeight: 1.55,
              padding: '12px 14px', borderRadius: '13px', boxShadow: '0 1px 2px rgba(30,30,60,.05)',
              animation: 'descIn .45s cubic-bezier(.22,1,.36,1) both',
            }}>{row.descText}</span>
          )}
        </div>
      )}
    </div>
  )
}

function toPascal(kebab: string): string {
  return kebab.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')
}
