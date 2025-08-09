'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import FieldEditor from './FieldEditor';
import { Field } from '@/types/form';

interface SortableFieldItemProps {
  field: Field;
  isSelected: boolean;
  onSelect: () => void;
}

export default function SortableFieldItem({ field, isSelected, onSelect }: SortableFieldItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <FieldEditor
        field={field}
        isSelected={isSelected}
        onSelect={onSelect}
        dragHandleProps={{ ...listeners }}
      />
    </div>
  );
}