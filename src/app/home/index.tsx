import MainSlideshow from "@/presentation/components/movies/MainSlideshow";
import MovieHorizontalList from "@/presentation/components/movies/MovieHorizontalList";
import ScreenState from "@/presentation/components/ScreenState";
import { useMovies } from "@/presentation/hooks/useMovies";
import { cinema } from "@/presentation/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const categories = [
  "Descubrir",
  "Populares",
  "Mejor valoradas",
  "Próximamente",
] as const;

export default function HomeScreen() {
  const { nowPlayingQuery, popularQuery, topRatedQuery, upcomingQuery } =
    useMovies();
  const safeArea = useSafeAreaInsets();
  const [category, setCategory] =
    useState<(typeof categories)[number]>("Descubrir");
  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        nowPlayingQuery.refetch(),
        popularQuery.refetch(),
        topRatedQuery.refetch(),
        upcomingQuery.refetch(),
      ]);
    } finally {
      setRefreshing(false);
    }
  };
  const sections = [
    {
      category: "Populares",
      title: "En boca de todos",
      subtitle: "POPULARES AHORA",
      query: popularQuery,
      movies: popularQuery.data ?? [],
    },
    {
      category: "Mejor valoradas",
      title: "Historias que dejan huella",
      subtitle: "LAS MEJOR VALORADAS",
      query: topRatedQuery,
      movies: topRatedQuery.data?.pages.flat() ?? [],
    },
    {
      category: "Próximamente",
      title: "Lo que viene",
      subtitle: "PRÓXIMAMENTE EN CINES",
      query: upcomingQuery,
      movies: upcomingQuery.data ?? [],
    },
  ];

  return (
    <ScrollView
      style={styles.screen}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: safeArea.top + 16,
        paddingBottom: safeArea.bottom + 24,
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refresh}
          tintColor={cinema.accent}
        />
      }
    >
      <View style={styles.header}>
        <View style={styles.brand}>
          <View style={styles.brandIcon}>
            <Ionicons name="film" size={21} color={cinema.background} />
          </View>
          <Text style={styles.brandText}>
            movies<Text style={{ color: cinema.accent }}>.</Text>
          </Text>
        </View>
        <View style={styles.edition}>
          <View style={styles.dot} />
          <Text style={styles.editionText}>MODO CINE</Text>
        </View>
      </View>
      <View style={styles.intro}>
        <Text style={styles.eyebrow}>PARA LOS QUE AMAN EL CINE</Text>
        <Text style={styles.heading}>Tu próxima gran historia.</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
      >
        {categories.map((item) => (
          <Pressable
            key={item}
            onPress={() => setCategory(item)}
            accessibilityRole="tab"
            accessibilityState={{ selected: category === item }}
            style={[styles.chip, category === item && styles.chipActive]}
          >
            <Text
              style={[
                styles.chipText,
                category === item && styles.chipTextActive,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      {category === "Descubrir" && (
        <>
          {nowPlayingQuery.isLoading ? (
            <ScreenState loading title="Preparando la cartelera…" />
          ) : nowPlayingQuery.isError ? (
            <ScreenState
              title="La cartelera está en pausa"
              description="No pudimos conectar. Revisa tu conexión y vuelve a intentarlo."
              onRetry={() => {
                void nowPlayingQuery.refetch();
              }}
            />
          ) : nowPlayingQuery.data?.length ? (
            <MainSlideshow movies={nowPlayingQuery.data} />
          ) : (
            <ScreenState
              title="Sin estrenos por ahora"
              description="Vuelve pronto para descubrir nuevas historias."
            />
          )}
        </>
      )}
      {sections
        .filter(
          (section) =>
            category === "Descubrir" || section.category === category,
        )
        .map((section) => (
          <View key={section.category} style={styles.section}>
            {section.query.isLoading ? (
              <ScreenState
                loading
                title={`Cargando ${section.category.toLowerCase()}…`}
              />
            ) : section.query.isError ? (
              <ScreenState
                title={`No pudimos cargar ${section.category.toLowerCase()}`}
                description="Desliza hacia abajo para actualizar o inténtalo de nuevo."
                onRetry={() => {
                  void section.query.refetch();
                }}
              />
            ) : (
              <MovieHorizontalList
                title={section.title}
                subtitle={section.subtitle}
                movies={section.movies}
                loadNextPage={
                  section.category === "Mejor valoradas" &&
                  topRatedQuery.hasNextPage &&
                  !topRatedQuery.isFetchingNextPage
                    ? () => {
                        void topRatedQuery.fetchNextPage();
                      }
                    : undefined
                }
                loadingMore={
                  section.category === "Mejor valoradas" &&
                  topRatedQuery.isFetchingNextPage
                }
              />
            )}
          </View>
        ))}
      <View style={styles.footer}>
        <Ionicons name="aperture-outline" size={16} color={cinema.accent} />
        <Text style={styles.footerText}>
          Una buena historia siempre te espera.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: cinema.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 10 },
  brandIcon: {
    backgroundColor: cinema.accent,
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  brandText: {
    fontSize: 29,
    fontWeight: "800",
    letterSpacing: -1.3,
    color: cinema.text,
  },
  edition: { flexDirection: "row", alignItems: "center", gap: 6 },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: cinema.accent },
  editionText: {
    color: cinema.muted,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.4,
  },
  intro: { paddingHorizontal: 24, marginTop: 26 },
  eyebrow: {
    fontSize: 9,
    letterSpacing: 2,
    fontWeight: "700",
    color: cinema.accent,
    marginBottom: 8,
  },
  heading: {
    fontSize: 27,
    fontWeight: "700",
    color: cinema.text,
    letterSpacing: -0.9,
  },
  categories: {
    paddingHorizontal: 24,
    gap: 8,
    paddingTop: 22,
    paddingBottom: 24,
  },
  chip: {
    paddingHorizontal: 17,
    paddingVertical: 11,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: cinema.border,
  },
  chipActive: { backgroundColor: cinema.accent, borderColor: cinema.accent },
  chipText: { color: cinema.muted, fontSize: 12, fontWeight: "600" },
  chipTextActive: { color: cinema.background, fontWeight: "700" },
  section: { marginTop: 29 },
  footer: {
    marginTop: 38,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  footerText: { fontSize: 11, color: cinema.muted },
});
