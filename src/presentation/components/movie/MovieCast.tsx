import type { Cast } from "@/domain/entities/cast.entity";
import { cinema } from "@/presentation/theme";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ActorCard } from "./ActorCard";

export default function MovieCast({ cast }: { cast: Cast[] }) {
  if (!cast.length) return null;
  return (
    <View style={styles.section}>
      <View style={styles.heading}>
        <Text style={styles.title}>Quienes dan vida a la historia</Text>
        <Text style={styles.subtitle}>EL REPARTO</Text>
      </View>
      <FlatList
        horizontal
        data={cast}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
        renderItem={({ item }) => <ActorCard actor={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 30 },
  heading: { paddingHorizontal: 24, marginBottom: 18 },
  title: {
    color: cinema.text,
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  subtitle: {
    color: cinema.accent,
    fontSize: 8,
    letterSpacing: 1.8,
    marginTop: 7,
    fontWeight: "700",
  },
});
