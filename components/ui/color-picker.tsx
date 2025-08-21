import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Palette, Sparkles, Check } from "lucide-react";
import { Label } from "@/components/ui/label";

interface ColorPickerProps {
	value: string;
	onChange: (val: string) => void;
	presets?: string[]; // hex
	buttonClassName?: string;
}

const DEFAULT_PRESETS = [
	// Colores principales Vendes
	"#551BB3", // Morado Vendes
	"#A9F04D", // Verde Vendes
	"#FF5733", // Naranja Vendes
	
	// Azules
	"#3B82F6", // Azul
	"#1E40AF", // Azul oscuro
	"#60A5FA", // Azul claro
	"#DBEAFE", // Azul muy claro
	"#1E3A8A", // Azul marino
	"#0EA5E9", // Azul cielo
	"#0284C7", // Azul medio
	
	// Verdes
	"#10B981", // Verde
	"#059669", // Verde oscuro
	"#34D399", // Verde claro
	"#D1FAE5", // Verde muy claro
	"#16A34A", // Verde bosque
	"#22C55E", // Verde lima
	"#84CC16", // Verde lima claro
	"#A3E635", // Verde lima muy claro
	
	// Rojos
	"#DC2626", // Rojo
	"#B91C1C", // Rojo oscuro
	"#EF4444", // Rojo claro
	"#FEE2E2", // Rojo muy claro
	"#991B1B", // Rojo vino
	"#F87171", // Rojo coral
	
	// Amarillos/Naranjas
	"#F59E0B", // Amarillo
	"#D97706", // Amarillo oscuro
	"#FBBF24", // Amarillo claro
	"#FEF3C7", // Amarillo muy claro
	"#EA580C", // Naranja
	"#FB923C", // Naranja claro
	"#FED7AA", // Naranja muy claro
	
	// Púrpuras/Magentas
	"#8B5CF6", // Púrpura
	"#7C3AED", // Púrpura oscuro
	"#A78BFA", // Púrpura claro
	"#EDE9FE", // Púrpura muy claro
	"#EC4899", // Rosa
	"#F472B6", // Rosa claro
	"#FCE7F3", // Rosa muy claro
	
	// Grises
	"#111827", // Gris muy oscuro
	"#374151", // Gris oscuro
	"#6B7280", // Gris medio
	"#9CA3AF", // Gris claro
	"#D1D5DB", // Gris muy claro
	"#F3F4F6", // Gris claro
	"#F9FAFB", // Gris muy claro
	"#FFFFFF", // Blanco
	
	// Colores neutros
	"#E5E7EB", // Gris neutro
	"#F5F5F5", // Gris claro neutro
	"#FAFAFA", // Gris muy claro neutro
	
	// Colores adicionales
	"#000000", // Negro
	"#FFD700", // Dorado
	"#C0C0C0", // Plateado
	"#FF69B4", // Rosa caliente
	"#00CED1", // Turquesa
	"#FF4500", // Naranja rojizo
	"#9400D3", // Violeta
	"#32CD32", // Verde lima
	"#FF1493", // Rosa profundo
	"#00BFFF", // Azul cielo profundo
	"#FF6347", // Tomate
	"#9370DB", // Púrpura medio
	"#20B2AA", // Verde azulado claro
	"#FF8C00", // Naranja oscuro
	"#BA55D3", // Orquídea medio
	"#00FA9A", // Verde primavera
	"#FF69B4", // Rosa caliente
	"#4169E1", // Azul real
	"#8A2BE2", // Azul violeta
	"#DC143C", // Carmesí
	"#00FFFF", // Cian
	"#FF00FF", // Magenta
	"#FFFF00", // Amarillo puro
	"#00FF00", // Verde puro
	"#FF0000", // Rojo puro
	"#0000FF", // Azul puro
];

function clamp(n: number, min: number, max: number) {
	return Math.min(Math.max(n, min), max);
}

function hexToRgb(hex: string) {
	const clean = hex.replace("#", "");
	const bigint = parseInt(clean.length === 3 ? clean.split("").map(c => c + c).join("") : clean, 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;
	return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number) {
	return (
		"#" +
		[r, g, b]
			.map((x) => {
				const h = x.toString(16);
				return h.length === 1 ? "0" + h : h;
			})
			.join("")
	);
}

export function ColorPicker({
	value,
	onChange,
	presets = DEFAULT_PRESETS,
	buttonClassName
}: ColorPickerProps) {
	const [isOpen, setIsOpen] = React.useState(false);
	const [selectedColor, setSelectedColor] = React.useState(value);
	const [hexInput, setHexInput] = React.useState(value);

	const applyHex = (hex: string) => {
		setSelectedColor(hex);
		setHexInput(hex);
		onChange(hex);
	};

	const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newColor = e.target.value;
		setSelectedColor(newColor);
		setHexInput(newColor);
		onChange(newColor);
	};

	const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const hex = e.target.value;
		setHexInput(hex);
		
		// Validar formato hexadecimal
		if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
			setSelectedColor(hex);
			onChange(hex);
		}
	};

	const handleHexInputBlur = () => {
		// Si el input no es válido, restaurar el valor anterior
		if (!/^#[0-9A-Fa-f]{6}$/.test(hexInput)) {
			setHexInput(selectedColor);
		}
	};

	// Actualizar hexInput cuando cambie el valor externo
	React.useEffect(() => {
		setSelectedColor(value);
		setHexInput(value);
	}, [value]);

	// Agrupar colores por categorías
	const colorCategories = {
		"Vendes": presets.slice(0, 3),
		"Azules": presets.slice(3, 10),
		"Verdes": presets.slice(10, 18),
		"Rojos": presets.slice(18, 24),
		"Amarillos/Naranjas": presets.slice(24, 31),
		"Púrpuras/Magentas": presets.slice(31, 38),
		"Grises": presets.slice(38, 46),
		"Neutros": presets.slice(46, 49),
		"Adicionales": presets.slice(49)
	};

	return (
		<div className="flex items-center gap-3">
			<Popover open={isOpen} onOpenChange={setIsOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className={[
							"h-10 w-10 relative group transition-all duration-200",
							"hover:scale-105 hover:shadow-lg",
							"focus:ring-2 focus:ring-primary focus:ring-offset-2",
							buttonClassName
						].filter(Boolean).join(" ")}
						type="button"
						title="Abrir paleta de colores"
					>
						{/* Color de fondo completo */}
						<div 
							className="absolute inset-0 rounded-lg border-2 border-white shadow-sm"
							style={{ backgroundColor: value }}
						/>
						
						{/* Icono con efecto hover */}
						<div className="relative z-10 flex items-center justify-center">
							<Palette className="h-4 w-4 text-white drop-shadow-sm group-hover:scale-110 transition-transform duration-200" />
						</div>
						
						{/* Efecto de brillo en hover */}
						<div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
					</Button>
				</PopoverTrigger>
				
				<PopoverContent className="w-96 p-0 border-0 shadow-2xl bg-white/95 backdrop-blur-md">
					<div className="p-6 space-y-6">
						{/* Header */}
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-semibold text-gray-900">Seleccionar Color</h3>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setIsOpen(false)}
								className="h-8 w-8 p-0"
							>
								×
							</Button>
						</div>

						{/* Input de color nativo */}
						<div className="space-y-2">
							<Label className="text-sm font-medium text-gray-700">Color Picker</Label>
							<div className="flex items-center gap-3">
								<input
									type="color"
									value={selectedColor}
									onChange={handleColorChange}
									className="h-10 w-20 rounded-lg border border-gray-300 cursor-pointer"
								/>
								<div className="flex-1">
									<Input
										value={hexInput}
										onChange={handleHexInputChange}
										onBlur={handleHexInputBlur}
										placeholder="#000000"
										className="font-mono text-sm"
									/>
								</div>
							</div>
						</div>

						{/* Colores predefinidos */}
						<div className="space-y-4">
							{Object.entries(colorCategories).map(([category, colors]) => (
								<div key={category} className="space-y-2">
									<h4 className="text-sm font-medium text-gray-700">{category}</h4>
									<div className="grid grid-cols-8 gap-2">
										{colors.map((color) => (
											<button
												key={color}
												onClick={() => applyHex(color)}
												className={[
													"h-8 w-8 rounded-lg border-2 transition-all duration-200",
													"hover:scale-110 hover:shadow-lg",
													selectedColor === color
														? "border-gray-900 shadow-lg scale-110"
														: "border-gray-300 hover:border-gray-400"
												].join(" ")}
												style={{ backgroundColor: color }}
												title={color}
											/>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</PopoverContent>
			</Popover>

			{/* Input hexadecimal visible */}
			<div className="flex-1">
				<Input
					value={hexInput}
					onChange={handleHexInputChange}
					onBlur={handleHexInputBlur}
					placeholder="#000000"
					className="font-mono text-sm h-10"
				/>
			</div>
		</div>
	);
}
