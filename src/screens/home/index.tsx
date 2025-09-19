import { Body1, Body2, Heading1, Heading2 } from '@/components/ui';
import { makeStyles, useTheme } from '@/theme';
import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

export default function HomeIndex() {
  const styles = useStyles({});
  const theme = useTheme();
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#34d399', '#10b981']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Heading1 color={theme.colors.white}>Bản đồ</Heading1>
        <Body1 color={theme.colors.white} style={styles.headerSubtitle}>
          Xem bản đồ thời tiết và môi trường
        </Body1>
      </LinearGradient>
      
      <View style={styles.content}>
        <Heading2 color={theme.colors.neutral100} style={styles.sectionTitle}>
          🗺️ Bản đồ có sẵn
        </Heading2>
        
        <Link href="/(maps)/windy" asChild>
          <Pressable style={styles.cardContainer}>
            {({ pressed }) => (
              <View style={[styles.card, pressed && styles.cardPressed]}>
                <View style={styles.cardContent}>
                  <View style={styles.iconContainer}>
                    <Feather name="thermometer" size={24} color="#0ea5e9" />
                  </View>
                  <View style={styles.textContainer}>
                    <Heading2 color={theme.colors.neutral100} style={styles.cardTitle}>
                      Temperature Map
                    </Heading2>
                    <Body2 color={theme.colors.neutral60} style={styles.cardDescription}>
                      Bản đồ nhiệt độ theo từng địa phương
                    </Body2>
                  </View>
                  <Feather name="chevron-right" size={20} color="#a3a3a3" />
                </View>
              </View>
            )}
          </Pressable>
        </Link>

        <Link href="/(maps)/greenmap" asChild>
          <Pressable style={styles.cardContainer}>
            {({ pressed }) => (
              <View style={[styles.card, pressed && styles.cardPressed]}>
                <View style={styles.cardContent}>
                  <View style={[styles.iconContainer, styles.greenIcon]}>
                    <Feather name="map-pin" size={24} color="#10b981" />
                  </View>
                  <View style={styles.textContainer}>
                    <Heading2 color={theme.colors.neutral100} style={styles.cardTitle}>
                      Green Map
                    </Heading2>
                    <Body2 color={theme.colors.neutral60} style={styles.cardDescription}>
                      Bản đồ môi trường với viewbox Việt Nam
                    </Body2>
                  </View>
                  <Feather name="chevron-right" size={20} color="#a3a3a3" />
                </View>
              </View>
            )}
          </Pressable>
        </Link>
        
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <View style={styles.infoIconContainer}>
              <Feather name="info" size={20} color="#34d399" />
            </View>
            <Heading2 color={theme.colors.neutral100} style={styles.infoTitle}>
              Thông tin
            </Heading2>
          </View>
          <Body2 color={theme.colors.neutral60} style={styles.infoText}>
            Các bản đồ được hiển thị trong WebView với khả năng zoom và pan mượt mà. 
            Nếu iframe bị chặn, bạn có thể sử dụng nút "Mở trình duyệt" để xem trực tiếp trên web.
          </Body2>
        </View>
      </View>
    </ScrollView>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral20,
  },
  header: {
    paddingTop: theme.spacing['2xl'],
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.base,
    alignItems: 'center',
  },
  headerTitle: {
    marginBottom: theme.spacing.sm,
  },
  headerSubtitle: {
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: theme.spacing.base,
  },
  sectionTitle: {
    marginBottom: theme.spacing.base,
    paddingLeft: theme.spacing.xs,
  },
  cardContainer: {
    marginBottom: theme.spacing.base,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.border.radius.xl,
    padding: theme.spacing.base,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: theme.colors.neutral30,
  },
  cardPressed: {
    opacity: 0.8,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    backgroundColor: theme.colors.brand20,
    borderRadius: theme.border.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.base,
  },
  greenIcon: {
    backgroundColor: theme.colors.success20,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    marginBottom: theme.spacing.xs,
  },
  cardDescription: {},
  infoCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.border.radius.xl,
    padding: theme.spacing.base,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: theme.colors.neutral30,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.success20,
    borderRadius: theme.border.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  infoTitle: {},
  infoText: {},
}));
