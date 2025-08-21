// Utilidades para accesibilidad (WCAG 2.1)

/**
 * Calcula el contraste entre dos colores
 * @param color1 - Color de fondo (hex)
 * @param color2 - Color de texto (hex)
 * @returns Ratio de contraste
 */
export const calculateContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (color: string): number => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    const [rs, gs, bs] = [r, g, b].map(c => {
      if (c <= 0.03928) {
        return c / 12.92;
      }
      return Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Verifica si el contraste cumple con WCAG 2.1
 * @param backgroundColor - Color de fondo
 * @param textColor - Color de texto
 * @param level - Nivel de conformidad ('AA' | 'AAA')
 * @returns true si cumple con el estándar
 */
export const meetsContrastStandard = (
  backgroundColor: string,
  textColor: string,
  level: 'AA' | 'AAA' = 'AA'
): boolean => {
  const ratio = calculateContrastRatio(backgroundColor, textColor);
  const standard = level === 'AA' ? 4.5 : 7;
  return ratio >= standard;
};

/**
 * Genera un ID único para elementos de accesibilidad
 * @param prefix - Prefijo para el ID
 * @returns ID único
 */
export const generateAriaId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Valida si un color es legible sobre un fondo
 * @param color - Color a validar
 * @param background - Color de fondo
 * @returns true si es legible
 */
export const isColorReadable = (color: string, background: string): boolean => {
  return meetsContrastStandard(background, color, 'AA');
};

/**
 * Utilidades para navegación por teclado
 */
export const keyboardNavigation = {
  /**
   * Maneja la navegación con teclas de flecha
   */
  handleArrowKeys: (
    event: KeyboardEvent,
    currentIndex: number,
    totalItems: number,
    onNavigate: (index: number) => void
  ) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % totalItems;
        onNavigate(nextIndex);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        const prevIndex = currentIndex === 0 ? totalItems - 1 : currentIndex - 1;
        onNavigate(prevIndex);
        break;
      case 'Home':
        event.preventDefault();
        onNavigate(0);
        break;
      case 'End':
        event.preventDefault();
        onNavigate(totalItems - 1);
        break;
    }
  },

  /**
   * Maneja la activación con Enter o Space
   */
  handleActivation: (
    event: KeyboardEvent,
    onActivate: () => void
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onActivate();
    }
  },
};

/**
 * Atributos ARIA comunes
 */
export const ariaAttributes = {
  /**
   * Para elementos que pueden ser expandidos/colapsados
   */
  expandable: (expanded: boolean, controls?: string) => ({
    'aria-expanded': expanded,
    ...(controls && { 'aria-controls': controls }),
  }),

  /**
   * Para elementos seleccionables
   */
  selectable: (selected: boolean, multiselectable?: boolean) => ({
    'aria-selected': selected,
    ...(multiselectable !== undefined && { 'aria-multiselectable': multiselectable }),
  }),

  /**
   * Para elementos con estado de carga
   */
  loading: (loading: boolean) => ({
    'aria-busy': loading,
    ...(loading && { 'aria-live': 'polite' }),
  }),

  /**
   * Para elementos con descripción
   */
  describedBy: (descriptionId: string) => ({
    'aria-describedby': descriptionId,
  }),

  /**
   * Para elementos con etiqueta
   */
  labelledBy: (labelId: string) => ({
    'aria-labelledby': labelId,
  }),
};

/**
 * Roles ARIA comunes
 */
export const ariaRoles = {
  button: 'button',
  link: 'link',
  tab: 'tab',
  tabpanel: 'tabpanel',
  listbox: 'listbox',
  option: 'option',
  combobox: 'combobox',
  textbox: 'textbox',
  checkbox: 'checkbox',
  radio: 'radio',
  switch: 'switch',
  slider: 'slider',
  progressbar: 'progressbar',
  status: 'status',
  alert: 'alert',
  dialog: 'dialog',
  tooltip: 'tooltip',
  menu: 'menu',
  menuitem: 'menuitem',
  navigation: 'navigation',
  main: 'main',
  banner: 'banner',
  contentinfo: 'contentinfo',
  complementary: 'complementary',
  region: 'region',
} as const;

/**
 * Estados ARIA comunes
 */
export const ariaStates = {
  hidden: 'hidden',
  disabled: 'disabled',
  required: 'required',
  invalid: 'invalid',
  readonly: 'readonly',
  pressed: 'pressed',
  checked: 'checked',
  selected: 'selected',
  expanded: 'expanded',
  current: 'current',
} as const;
