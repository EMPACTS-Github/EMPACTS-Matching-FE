'use client';

import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { STARTUP_SDG_GOALS } from '@/constants/sdgs';
import CategoryItem from './CategoryItem';
import { SdgGoal } from '@/interfaces/startup';
import ChevronDownIcon from '@/components/Icons/ChevronDownIcon';
import ChevronUpIcon from '@/components/Icons/ChevronUpIcon';

interface CategoryProps {
  selectedCategory?: string[];
  setSelectedCategory: (categories: string[]) => void;
}

const CategoryList: React.FC<CategoryProps> = ({ selectedCategory = [], setSelectedCategory }) => {
  const allCategories: SdgGoal[] = (
    Object.keys(STARTUP_SDG_GOALS) as Array<keyof typeof STARTUP_SDG_GOALS>
  ).map((key) => ({
    id: STARTUP_SDG_GOALS[key].textValue,
    label: STARTUP_SDG_GOALS[key].label,
  }));

  const initialCategories = allCategories.slice(0, 5);
  const moreTabs1 = allCategories.slice(5, 8);
  const moreTabs2 = allCategories.slice(8, 11);
  const moreTabs3 = allCategories.slice(11, 14);

  const [showMore, setShowMore] = useState(false);
  const [selectAll, setSelectAll] = useState(true);

  const handleSelectCategory = (tabId: string) => {
    setSelectAll(false);
    const isSelected = selectedCategory.includes(tabId);

    const updatedCategory = isSelected
      ? selectedCategory.filter((id) => id !== tabId)
      : [...selectedCategory, tabId];

    if (updatedCategory.length === 0) {
      setSelectAll(true);
    }
    setSelectedCategory(updatedCategory);
  };

  const handleSelectAll = () => {
    setSelectAll(true);
    setSelectedCategory([]);
  };

  return (
    <div className="w-full p-6">
      <div className="flex gap-2 overflow-x-auto justify-center whitespace-nowrap mb-2">
        <Button
          onPress={() => handleSelectAll()}
          size="md"
          variant={selectAll ? 'solid' : 'ghost'}
          radius="full"
          color="primary"
          style={{
            whiteSpace: 'normal', // Ensure full text is displayed
            wordBreak: 'break-word', // Break long words
          }}
          className={!selectAll ? 'border-empacts-grey-50 border-1' : ''}
        >
          <div className="text-sm">All</div>
        </Button>
        {initialCategories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            selectedCategory={selectedCategory}
            handleSelectCategory={handleSelectCategory}
          />
        ))}
        {!showMore && (
          <Button
            onPress={() => setShowMore(!showMore)}
            size="md"
            variant="ghost"
            radius="full"
            color="primary"
            className="border-empacts-grey-50 border-1"
            endContent={<ChevronDownIcon className="color-empacts" />}
          >
            <div className="text-sm font-semibold">More</div>
          </Button>
        )}
      </div>
      {showMore && (
        <div className="flex flex-col items-center">
          <div className="flex gap-2 overflow-x-auto mb-2 justify-center whitespace-nowrap">
            {moreTabs1.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                selectedCategory={selectedCategory}
                handleSelectCategory={handleSelectCategory}
              />
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto mb-2 justify-center whitespace-nowrap">
            {moreTabs2.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                selectedCategory={selectedCategory}
                handleSelectCategory={handleSelectCategory}
              />
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto mb-2 justify-center whitespace-nowrap">
            {moreTabs3.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                selectedCategory={selectedCategory}
                handleSelectCategory={handleSelectCategory}
              />
            ))}
            <Button
              onPress={() => setShowMore(!showMore)}
              size="md"
              variant="ghost"
              radius="full"
              color="primary"
              className="border-empacts-grey-50 border-1"
              endContent={<ChevronUpIcon className="color-empacts" />}
            >
              <div className="text-sm font-semibold">Less</div>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
