'use client'

import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardPaste,
  Moon,
  MoreHorizontal,
  Plus,
  Search,
  Sun,
  TrendingUp,
  X,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

type Stage = 'Applied' | 'Interview' | 'Technical Test' | 'Offer' | 'Rejected'

type Application = {
  id: number
  company: string
  role: string
  date: string
  stack: string[]
  stage: Stage
  logo: string
  color: string
}

const stages: { name: Stage; color: string }[] = [
  { name: 'Applied', color: 'bg-sky-500' },
  { name: 'Interview', color: 'bg-violet-500' },
  { name: 'Technical Test', color: 'bg-amber-500' },
  { name: 'Offer', color: 'bg-emerald-500' },
  { name: 'Rejected', color: 'bg-rose-500' },
]

const initialApplications: Application[] = [
  { id: 1, company: 'Vercel', role: 'Frontend Engineer', date: 'Oct 06, 2026', stack: ['Next.js', 'React', 'TypeScript'], stage: 'Applied', logo: '▲', color: 'bg-foreground' },
  { id: 2, company: 'Linear', role: 'Full Stack Engineer', date: 'Oct 04, 2026', stack: ['React', 'Node.js', 'TypeScript'], stage: 'Applied', logo: 'L', color: 'bg-indigo-500' },
  { id: 3, company: 'Arc', role: 'Senior Frontend Developer', date: 'Sep 30, 2026', stack: ['React', 'Next.js', 'Node.js'], stage: 'Applied', logo: 'A', color: 'bg-orange-500' },
  { id: 4, company: 'Notion', role: 'Full Stack Software Engineer', date: 'Sep 28, 2026', stack: ['TypeScript', 'React', 'Node.js'], stage: 'Interview', logo: 'N', color: 'bg-foreground' },
  { id: 5, company: 'Ramp', role: 'Frontend Engineer, Growth', date: 'Sep 24, 2026', stack: ['Next.js', 'React', 'TypeScript'], stage: 'Interview', logo: 'R', color: 'bg-teal-500' },
  { id: 6, company: 'Loom', role: 'Full Stack Engineer', date: 'Sep 19, 2026', stack: ['NestJS', 'React', 'Node.js'], stage: 'Technical Test', logo: 'L', color: 'bg-violet-500' },
  { id: 7, company: 'Stripe', role: 'Senior Frontend Engineer', date: 'Sep 12, 2026', stack: ['React', 'TypeScript', 'Next.js'], stage: 'Offer', logo: 'S', color: 'bg-indigo-600' },
  { id: 8, company: 'Webflow', role: 'Software Engineer, Frontend', date: 'Aug 30, 2026', stack: ['React', 'Node.js', 'TypeScript'], stage: 'Rejected', logo: 'W', color: 'bg-blue-500' },
]

export default function Page() {
  const [applications, setApplications] = useState(initialApplications)
  const [dark, setDark] = useState(false)
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [posting, setPosting] = useState('')

  const filtered = useMemo(
    () => applications.filter((application) => `${application.company} ${application.role} ${application.stack.join(' ')}`.toLowerCase().includes(search.toLowerCase())),
    [applications, search],
  )

  function addApplication() {
    if (!posting.trim()) return
    const firstLine = posting.trim().split('\n')[0]
    setApplications((current) => [
      { id: Date.now(), company: 'New application', role: firstLine.slice(0, 34), date: 'Today', stack: ['To review'], stage: 'Applied', logo: 'N', color: 'bg-primary' },
      ...current,
    ])
    setPosting('')
    setOpen(false)
  }

  return (
    <div className={cn('min-h-screen bg-background text-foreground', dark && 'dark')}>
      <header className="border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-5 px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"><BriefcaseBusiness data-icon="inline-start" /></div>
            <div><p className="text-[15px] font-semibold tracking-tight">Applyr</p><p className="text-xs text-muted-foreground">Job search, organized.</p></div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setDark(!dark)}>{dark ? <Sun /> : <Moon />}</Button>
            <div className="flex size-9 items-center justify-center rounded-full bg-amber-100 text-xs font-semibold text-amber-800">JD</div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1480px] px-5 py-8 lg:px-8">
        <section className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div><p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Workspace / Applications</p><h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Your job search</h1><p className="mt-2 text-sm text-muted-foreground">Keep momentum. You’re closer than you think.</p></div>
          <Dialog open={open} onOpenChange={setOpen}>
            <div className="flex flex-wrap gap-2">
              <DialogTrigger render={<Button variant="outline" />}>
                <ClipboardPaste data-icon="inline-start" /> Paste job posting
              </DialogTrigger>
              <DialogTrigger render={<Button />}>
                <Plus data-icon="inline-start" /> New application
              </DialogTrigger>
            </div>
            <DialogContent className="sm:max-w-[540px]">
              <DialogHeader><DialogTitle>Add a job posting</DialogTitle><DialogDescription>Paste the job description or a link. We’ll add it to your Applied column to review.</DialogDescription></DialogHeader>
              <Textarea value={posting} onChange={(event) => setPosting(event.target.value)} placeholder="Paste job posting here..." className="min-h-44 resize-none" />
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
                <Button onClick={addApplication} disabled={!posting.trim()}>Add application</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[['Total applications', applications.length.toString(), '+3 this week', TrendingUp], ['Response rate', '42%', '+8.2% vs last month', TrendingUp], ['In progress', applications.filter((a) => !['Applied', 'Rejected'].includes(a.stage)).length.toString(), 'Keep it moving', ArrowUpRight], ['Next follow-up', 'Tomorrow', 'Notion · 10:30 AM', CalendarDays]].map(([label, value, note, Icon]) => <Card key={String(label)} className="shadow-none"><CardContent className="p-5"><div className="flex items-start justify-between"><p className="text-sm text-muted-foreground">{label}</p><Icon className="text-muted-foreground" /></div><p className="mt-4 text-3xl font-semibold tracking-tight">{value}</p><p className="mt-1 text-xs text-muted-foreground">{note}</p></CardContent></Card>)}
        </section>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search applications..." className="pl-9" /></div>
          <Button variant="ghost" size="sm" className="w-fit text-muted-foreground">Last updated just now <ChevronDown data-icon="inline-end" /></Button>
        </div>

        <section className="grid gap-4 overflow-x-auto pb-5 md:grid-cols-2 xl:grid-cols-5">
          {stages.map((stage) => {
            const stageApps = filtered.filter((application) => application.stage === stage.name)
            return <div key={stage.name} className="min-w-[270px] rounded-2xl border border-border/70 bg-muted/35 p-3">
              <div className="mb-3 flex items-center justify-between px-1"><div className="flex items-center gap-2"><span className={cn('size-2 rounded-full', stage.color)} /><h2 className="text-sm font-semibold">{stage.name}</h2><span className="text-xs text-muted-foreground">{stageApps.length}</span></div><Button variant="ghost" size="icon-xs" aria-label={`Add to ${stage.name}`}><Plus /></Button></div>
              <div className="flex flex-col gap-3">{stageApps.map((application) => { const visibleTags = application.stack.slice(0, 2); const remainingTags = application.stack.length - visibleTags.length; const shortDate = application.date === 'Today' ? application.date : application.date.replace(/^(\w+)\s+0?(\d+),.*$/, '$1 $2'); return <Card key={application.id} className="group shadow-none transition-shadow hover:shadow-md"><CardHeader className="p-3 pb-0"><div className="flex min-w-0 items-center gap-2"><div className={cn('flex size-7 shrink-0 items-center justify-center rounded-md text-xs font-semibold text-white', application.color)}>{application.logo}</div><p className="truncate text-sm font-semibold">{application.company}</p><Button variant="ghost" size="icon-xs" className="ml-auto shrink-0 opacity-0 transition-opacity group-hover:opacity-100" aria-label={`More options for ${application.company}`}><MoreHorizontal /></Button></div></CardHeader><CardContent className="flex flex-col gap-2 p-3 pt-1"><p className="text-sm leading-5 text-muted-foreground">{application.role}</p><div className="flex flex-wrap gap-1.5">{visibleTags.map((tag) => <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>)}{remainingTags > 0 && <Badge variant="secondary" className="font-normal">+{remainingTags}</Badge>}</div><div className="flex items-center gap-1.5 text-xs text-muted-foreground"><CalendarDays /> <span className="whitespace-nowrap">{shortDate}</span></div></CardContent></Card> })}</div>
              {stageApps.length === 0 && <div className="flex min-h-28 items-center justify-center rounded-xl border border-dashed border-border text-center text-xs text-muted-foreground">No applications here</div>}
            </div>
          })}
        </section>
        <footer className="mt-2 flex items-center justify-between border-t border-border/70 pt-5 text-xs text-muted-foreground"><span>Showing {filtered.length} of {applications.length} applications</span><span className="hidden items-center gap-1 sm:flex"><Check /> All changes saved</span></footer>
      </main>
    </div>
  )
}
