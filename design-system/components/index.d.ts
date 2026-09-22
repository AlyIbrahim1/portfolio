import type * as React from 'react';
export type IconName = 'python'|'fastapi'|'postgresql'|'sqlalchemy'|'langgraph'|'scikit-learn'|'typescript'|'react'|'tailwind-css'|'supabase'|'github-actions'|'github'|'linkedin'|'mail'|'arrow-up-right'|'arrow-right'|'arrow-up'|'close'|'send';
export interface IconProps { name: IconName; size?: number; label?: string; className?: string; style?: React.CSSProperties }
export declare function Icon(props: IconProps): React.ReactElement | null;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: 'primary'|'secondary'|'ghost'|'icon'; size?: 'md'|'sm'; round?: boolean; icon?: IconName; iconStart?: IconName; shine?: boolean; href?: string }
export declare function Button(props: ButtonProps): React.ReactElement;
export interface PillProps { variant?: 'outline'|'solid'|'status'|'now'; children?: React.ReactNode; title?: string; className?: string }
export declare function Pill(props: PillProps): React.ReactElement;
export interface TextFieldProps { label: string; id?: string; name?: string; type?: string; placeholder?: string; value?: string; defaultValue?: string; onChange?: React.ChangeEventHandler; hint?: string; error?: string; multiline?: boolean; rows?: number }
export declare function TextField(props: TextFieldProps): React.ReactElement;
export interface SurfaceProps { as?: string; radius?: 'lg'|'none'; className?: string; style?: React.CSSProperties; children?: React.ReactNode }
export declare function Surface(props: SurfaceProps): React.ReactElement;
export interface TerminalWindowProps { title: React.ReactNode; footer?: React.ReactNode; as?: 'div'|'form'; className?: string; style?: React.CSSProperties; children?: React.ReactNode }
export declare function TerminalWindow(props: TerminalWindowProps): React.ReactElement;
export interface TraceSpan { name: string; start: number; width: number; ms: number; io?: boolean }
export interface RequestTraceProps { title: string; method: string; path: string; status: string; spans: TraceSpan[]; logs?: ['INFO'|'WARN'|'DEBUG', string][]; stats?: [string, string][]; label?: string }
export declare function RequestTrace(props: RequestTraceProps): React.ReactElement;
export interface NavLink { href: string; label: string }
export interface NavBarProps { name: string; links: NavLink[]; active?: string; cta?: NavLink; /** 'auto' (default) collapses below 768px; 'wide' or 'narrow' forces one form. */ layout?: 'auto'|'wide'|'narrow'; /** Omit to track window.scrollY > 8; pass true/false to force the scrolled or top form. */ scrolled?: boolean; /** Narrow form: start with the menu open. */ defaultOpen?: boolean; position?: 'fixed'|'absolute'|'static'|'sticky'; homeHref?: string }
export declare function NavBar(props: NavBarProps): React.ReactElement;
export interface SectionLabelProps { eyebrow: string; title: React.ReactNode; dim?: React.ReactNode; note?: string; action?: React.ReactNode; id?: string; level?: 1|2|3 }
export declare function SectionLabel(props: SectionLabelProps): React.ReactElement;
export interface ProjectCardProps { title: string; description?: string; href?: string; external?: boolean; art?: 'chat'|'chart'|'table'|'code'|React.ReactNode; artLabel?: string; tags?: string[]; lead?: boolean; className?: string }
export declare function ProjectCard(props: ProjectCardProps): React.ReactElement;
export interface ArchiveItem { title: string; description: string; stack: string; href?: string }
export interface ProjectArchiveProps { items: ArchiveItem[]; eyebrow?: string; title?: string; open?: boolean; onClose?: (() => void) | false; inline?: boolean }
export declare function ProjectArchive(props: ProjectArchiveProps): React.ReactElement;
export interface TechMarqueeProps { items: { logo: IconName; label: string }[]; duration?: number; label?: string }
export declare function TechMarquee(props: TechMarqueeProps): React.ReactElement;
export interface TimelineItem { state?: 'done'|'current'|'upcoming'; date: string; org?: string; title: string; description?: string; bullets?: string[] }
export declare function Timeline(props: { items: TimelineItem[] }): React.ReactElement;
export interface ContactFormProps { email?: string; title?: string; onSubmit?: (v: { name: string; email: string; message: string }) => void }
export declare function ContactForm(props: ContactFormProps): React.ReactElement;
export interface FooterProps { name: string; links?: NavLink[]; elsewhere?: { label: string; icon: IconName; href: string }[]; city?: string; timeZone?: string; offset?: string }
export declare function Footer(props: FooterProps): React.ReactElement;
export declare function Toast(props: { show?: boolean; style?: React.CSSProperties; children?: React.ReactNode }): React.ReactElement;
declare global { interface Window { Aly: { Icon: typeof Icon; Button: typeof Button; Pill: typeof Pill; TextField: typeof TextField; Surface: typeof Surface; TerminalWindow: typeof TerminalWindow; RequestTrace: typeof RequestTrace; NavBar: typeof NavBar; SectionLabel: typeof SectionLabel; ProjectCard: typeof ProjectCard; ProjectArchive: typeof ProjectArchive; TechMarquee: typeof TechMarquee; Timeline: typeof Timeline; ContactForm: typeof ContactForm; Footer: typeof Footer; Toast: typeof Toast; iconNames: IconName[] } } }
