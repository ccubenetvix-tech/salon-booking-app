import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Header } from '@/components/ui/header';
import { SalonColors } from '@/constants/theme';
import { serviceCategories } from '@/lib/mock-data';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ServiceCategoriesScreen() {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleContinue = () => {
    if (selectedCategories.length > 0) {
      router.push({
        pathname: '/(app)/salon/list' as any,
        params: { categories: selectedCategories.join(',') },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Select Services" />
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Choose the services you're looking for</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {serviceCategories.map((category) => {
            const isSelected = selectedCategories.includes(category.id);
            return (
              <TouchableOpacity
                key={category.id}
                onPress={() => toggleCategory(category.id)}
                activeOpacity={0.7}
                style={styles.categoryWrapper}
              >
                <Card style={isSelected ? [styles.categoryCard, styles.selectedCard] : styles.categoryCard}>
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryDescription}>{category.description}</Text>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={`Continue (${selectedCategories.length} selected)`}
          onPress={handleContinue}
          disabled={selectedCategories.length === 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SalonColors.background,
  },
  subtitleContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: SalonColors.textSecondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryWrapper: {
    width: '48%',
    marginBottom: 16,
  },
  categoryCard: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: SalonColors.primary,
    backgroundColor: SalonColors.primary + '10',
  },
  categoryIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: SalonColors.textPrimary,
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 12,
    color: SalonColors.textSecondary,
    textAlign: 'center',
  },
  footer: {
    padding: 24,
    backgroundColor: SalonColors.white,
    borderTopWidth: 1,
    borderTopColor: SalonColors.border,
  },
});
