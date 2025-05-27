import { Label } from '@radix-ui/react-label';
import { Minus, Plus, Dice6 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import formatModifier from 'core/models/atoms/modifiers/formatModifier';
import getModifier from 'core/models/atoms/modifiers/getModifier';

type Props = {
  value: number;
  attribute: string;
  isEditing: boolean;
  onChange: (newValue: number) => void;
  onRoll: () => void;
};

export default function AttributeEditor({
    value,
    attribute,
    isEditing = false,
    onChange,
    onRoll,
}: Props) {
  return (
    <div key={attribute} className="flex items-center justify-between p-3 border rounded-lg">
      <Label className="text-base font-medium capitalize min-w-[120px]">{attribute}</Label>

      <div className="flex items-center gap-3">
        {isEditing && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onChange(value - 1)}
              disabled={value <= 0}
              className="h-8 w-8 p-0"
            >
              <Minus className="h-4 w-4" />
            </Button>

            <Input
              type="number"
              min="0"
              max="100"
              value={value}
              onChange={(e) => onChange(Number.parseInt(e.target.value) || 0)}
              className="w-16 text-center"
            />

            <Button
              variant="outline"
              size="sm"
              onClick={() => onChange(value + 1)}
              disabled={value >= 100}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="sm" onClick={() => onRoll()} className="h-8 w-8 p-0">
              <Dice6 className="h-4 w-4" />
            </Button>
          </>
        )}

        {!isEditing && <div className="text-2xl font-bold min-w-[60px] text-center">{value}</div>}

        <div className="text-right min-w-[60px]">
          <div className="text-sm text-muted-foreground">Modifier</div>
          <div className="text-lg font-bold">{formatModifier(getModifier(value))}</div>
        </div>
      </div>
    </div>
  );
}
