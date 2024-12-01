'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [glowIntensity, setGlowIntensity] = useState(0.5)

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            if (!ctx) return

            canvas.width = window.innerWidth
            canvas.height = window.innerHeight

            const particles: Particle[] = []

            class Particle {
                x: number
                y: number
                size: number
                speedX: number
                speedY: number

                constructor() {
                    this.x = Math.random() * canvas.width
                    this.y = Math.random() * canvas.height
                    this.size = Math.random() * 3 + 1
                    this.speedX = Math.random() * 3 - 1.5
                    this.speedY = Math.random() * 3 - 1.5
                }

                update(mouseX: number, mouseY: number) {
                    this.x += this.speedX + (mouseX - this.x) * 0.10
                    this.y += this.speedY + (mouseY - this.y) * 0.10

                    if (this.size > 0.2) this.size -= 0.1
                }

                draw() {
                    ctx!.fillStyle = 'rgba(31,30,30,0.8)'
                    ctx!.beginPath()
                    ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                    ctx!.fill()
                }
            }

            const init = () => {
                for (let i = 0; i < 100; i++) {
                    particles.push(new Particle())
                }
            }

            let mouseX = 0
            let mouseY = 0

            window.addEventListener('mousemove', (e) => {
                mouseX = e.x
                mouseY = e.y
            })

            const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                for (let i = 0; i < particles.length; i++) {
                    particles[i].update(mouseX, mouseY)
                    particles[i].draw()
                }
                requestAnimationFrame(animate)
            }

            init()
            animate()

            return () => {
                window.removeEventListener('mousemove', () => {})
            }
        }
    }, [])

    useEffect(() => {
        const glowAnimation = () => {
            setGlowIntensity((prev) => {
                const newIntensity = prev + 0.05 * (Math.random() > 0.5 ? 1 : -1)
                return Math.max(0.3, Math.min(1, newIntensity))
            })
        }

        const intervalId = setInterval(glowAnimation, 100)

        return () => clearInterval(intervalId)
    }, [])

    return (
        <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden select-none">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/herobg.gif?height=1080&width=1920"
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
            </div>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-10 pointer-events-none"
            />
            <div className="z-20 flex flex-col items-center space-y-8">
                <div className="relative w-48 h-48">
                    <Image
                        src="/profile.jpg?height=192&width=192"
                        alt="Profile Picture"
                        width={192}
                        height={192}
                        className="rounded-full"
                    />
                    <div className="absolute inset-0 rounded-full shadow-lg shadow-blue-500/50 animate-pulse"/>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-6 max-w-md">
                    <p className="text-white text-center">
                        Jr. Admin on Boxhunt
                    </p>
                </div>
                <h1
                    className="text-6xl font-bold text-center transition-all duration-800 ease-in-out"
                    style={{
                        color: '#4228ed',
                        textShadow: `0 0 ${10 + glowIntensity * 20}px #4228ed, 0 0 ${20 + glowIntensity * 30}px #4228ed, 0 0 ${30 + glowIntensity * 40}px #4228ed`,
                    }}
                >
                    __4iq
                </h1>
                <div className="flex space-x-4">
                    <a
                        href="https://discord.gg/boxhunt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transform transition-transform hover:scale-110"
                    >
                        <Image src="/discord.svg" alt="Discord" width={48} height={48}/>
                    </a>
                    <a
                        href="https://namemc.com/__4iq"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transform transition-transform hover:scale-110"
                    >
                        <Image src="/namemc.svg" alt="NameMC" width={48} height={48}/>
                    </a>
                </div>
            </div>
        </main>
    )
}

