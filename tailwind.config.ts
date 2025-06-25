import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// VanRakshak AI Color Palette
				'forest-navy': '#0B1426',
				'electric-cyan': '#00D4FF',
				'bio-green': '#39FF6A',
				'neural-purple': '#8B5FFF',
				'tiger-orange': '#FF6B35',
				'misty-white': '#F8FAFC'
			},
			fontFamily: {
				'orbitron': ['Orbitron', 'sans-serif'],
				'inter': ['Inter', 'sans-serif'],
				'mono': ['JetBrains Mono', 'monospace']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'elegant-glow': {
					'0%, 100%': {
						filter: 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.2)) drop-shadow(0 0 16px rgba(57, 255, 106, 0.1))'
					},
					'50%': {
						filter: 'drop-shadow(0 0 12px rgba(0, 212, 255, 0.3)) drop-shadow(0 0 24px rgba(57, 255, 106, 0.15))'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-20px)'
					}
				},
				'glitch': {
					'0%': {
						transform: 'translate(0)'
					},
					'20%': {
						transform: 'translate(-2px, 2px)'
					},
					'40%': {
						transform: 'translate(-2px, -2px)'
					},
					'60%': {
						transform: 'translate(2px, 2px)'
					},
					'80%': {
						transform: 'translate(2px, -2px)'
					},
					'100%': {
						transform: 'translate(0)'
					}
				},
				'typing': {
					'from': {
						width: '0'
					},
					'to': {
						width: '100%'
					}
				},
				'blink': {
					'0%, 50%': {
						borderColor: 'transparent'
					},
					'51%, 100%': {
						borderColor: '#00D4FF'
					}
				},
				'particle-float': {
					'0%': {
						transform: 'translateY(100vh) translateX(0px)',
						opacity: '0'
					},
					'10%': {
						opacity: '1'
					},
					'90%': {
						opacity: '1'
					},
					'100%': {
						transform: 'translateY(-100vh) translateX(100px)',
						opacity: '0'
					}
				},
				'forest-sway': {
					'0%, 100%': {
						transform: 'rotate(0deg) translateX(0px)'
					},
					'25%': {
						transform: 'rotate(1deg) translateX(2px)'
					},
					'75%': {
						transform: 'rotate(-1deg) translateX(-2px)'
					}
				},
				'cloud-drift': {
					'0%': {
						transform: 'translateX(-100px)'
					},
					'100%': {
						transform: 'translateX(calc(100vw + 100px))'
					}
				},
				'mystical-glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px rgba(0, 212, 255, 0.3), 0 0 40px rgba(57, 255, 106, 0.2)'
					},
					'50%': {
						boxShadow: '0 0 30px rgba(0, 212, 255, 0.5), 0 0 60px rgba(57, 255, 106, 0.3)'
					}
				},
				'firefly-dance': {
					'0%': {
						transform: 'translate(0px, 0px)'
					},
					'33%': {
						transform: 'translate(30px, -20px)'
					},
					'66%': {
						transform: 'translate(-20px, 20px)'
					},
					'100%': {
						transform: 'translate(0px, 0px)'
					}
				},
				'aurora': {
					'0%, 100%': {
						opacity: '0.3',
						transform: 'translateX(-50%) scaleX(1)'
					},
					'50%': {
						opacity: '0.7',
						transform: 'translateX(-50%) scaleX(1.1)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'elegant-glow': 'elegant-glow 3s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'glitch': 'glitch 1s ease-in-out infinite',
				'typing': 'typing 3.5s steps(40, end)',
				'blink': 'blink 0.75s step-end infinite',
				'particle-float': 'particle-float 15s linear infinite',
				'forest-sway': 'forest-sway 8s ease-in-out infinite',
				'cloud-drift': 'cloud-drift 20s linear infinite',
				'mystical-glow': 'mystical-glow 4s ease-in-out infinite',
				'firefly-dance': 'firefly-dance 6s ease-in-out infinite',
				'aurora': 'aurora 10s ease-in-out infinite'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'cyber-grid': 'linear-gradient(rgba(0,212,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.1) 1px, transparent 1px)',
				'aurora-gradient': 'linear-gradient(45deg, rgba(0,212,255,0.3), rgba(139,95,255,0.3), rgba(57,255,106,0.3))'
			},
			backgroundSize: {
				'cyber-grid': '50px 50px'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
