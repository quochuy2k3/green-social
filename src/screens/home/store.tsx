import { Body1, Heading1, Heading2 } from '@/components/ui';
import { makeStyles, useTheme } from '@/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, View } from 'react-native';

export default function StoreScreen() {
  const styles = useStyles({});
  const theme = useTheme();
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#fbbf24', '#f59e0b']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Heading1 color={theme.colors.white}>Cửa hàng</Heading1>
        <Body1 color={theme.colors.white} style={styles.headerSubtitle}>
          Sản phẩm thân thiện môi trường
        </Body1>
      </LinearGradient>
      
      <View style={styles.content}>
        <View style={styles.card}>
          <Heading2 color={theme.colors.neutral100} style={styles.cardTitle}>
            Sản phẩm nổi bật
          </Heading2>
          <Body1 color={theme.colors.neutral60} style={styles.cardDescription}>
            Khám phá các sản phẩm eco-friendly được yêu thích nhất
          </Body1>
        </View>
        
        <View style={styles.card}>
          <Heading2 color={theme.colors.neutral100} style={styles.cardTitle}>
            Giảm giá đặc biệt
          </Heading2>
          <Body1 color={theme.colors.neutral60} style={styles.cardDescription}>
            Ưu đãi lên đến 30% cho các sản phẩm bảo vệ môi trường
          </Body1>
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
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.border.radius.xl,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.base,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    marginBottom: theme.spacing.sm,
  },
  cardDescription: {},
}));
