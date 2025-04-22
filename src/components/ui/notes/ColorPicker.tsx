
import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

interface ColorOption {
  name: string;
  value: string;
}

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorSelect }) => {
  const { t } = useLanguage();
  
  const colorOptions: ColorOption[] = [
    { name: 'Blue', value: '#3498db' },
    { name: 'Green', value: '#2ecc71' },
    { name: 'Purple', value: '#9b59b6' },
    { name: 'Orange', value: '#e67e22' },
    { name: 'Red', value: '#e74c3c' },
    { name: 'Yellow', value: '#f1c40f' },
    { name: 'Gray', value: '#95a5a6' },
  ];
  
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium">{t('color')}</label>
      <div className="flex space-x-2">
        {colorOptions.map((colorOption) => (
          <button
            key={colorOption.value}
            type="button"
            className={cn(
              "w-8 h-8 rounded-full transition-transform",
              selectedColor === colorOption.value && "ring-2 ring-ring scale-110"
            )}
            style={{ backgroundColor: colorOption.value }}
            onClick={() => onColorSelect(colorOption.value)}
            title={colorOption.name}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(ColorPicker);
