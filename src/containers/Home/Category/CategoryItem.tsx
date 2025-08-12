import React from 'react';
import { Button } from '@heroui/react';

interface Category {
  id: string;
  label: string;
}

interface CategoryItemProps {
  category: Category;
  selectedCategory: string[];
  handleSelectCategory: (id: string) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  selectedCategory,
  handleSelectCategory,
}) => {
  return (
    <Button
      key={category.id}
      onPress={() => handleSelectCategory(category.id)}
      size="md"
      variant={selectedCategory.includes(category.id) ? 'solid' : 'ghost'}
      className={
        !selectedCategory.includes(category.id)
          ? 'border-empacts-grey-50 border-1 text-sm font-semibold'
          : 'text-sm font-semibold'
      }
      color="primary"
      style={{
        whiteSpace: 'normal', // Ensure full text is displayed
        wordBreak: 'break-word', // Break long words
      }}
      radius="full"
    >
      <div className="text-[16px]">{category.label}</div>
    </Button>
  );
};

export default CategoryItem;
