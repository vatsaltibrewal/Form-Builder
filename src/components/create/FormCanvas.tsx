'use client';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { reorderFields, selectField } from '@/lib/slices/formBuilderSlice';

import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

import SortableFieldItem from './SortableFieldItem';
import { Box, Typography } from '@mui/material';

export default function FormCanvas() {
  const dispatch = useAppDispatch();
  const { fields, selectedFieldId } = useAppSelector((state) => state.formBuilder);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);
      dispatch(reorderFields({ startIndex: oldIndex, endIndex: newIndex }));
    }
  };

  const fieldIds = fields.map((f) => f.id);

  return (
    <Box onClick={() => dispatch(selectField(null))}> {/* Click on canvas to deselect all */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={fieldIds} strategy={verticalListSortingStrategy}>
          {fields.length > 0 ? (
            fields.map((field) => (
              <Box key={field.id} onClick={(e) => e.stopPropagation()}> {/* Stop propagation to prevent canvas click */}
                <SortableFieldItem
                  field={field}
                  isSelected={field.id === selectedFieldId}
                  onSelect={() => dispatch(selectField(field.id))}
                />
              </Box>
            ))
          ) : (
            <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 10 }}>
              Your form is empty. Add a field from the palette on the right.
            </Typography>
          )}
        </SortableContext>
      </DndContext>
    </Box>
  );
}