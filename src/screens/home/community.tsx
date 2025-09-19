import { Body1, Heading1, Heading2 } from '@/components/ui';
import { makeStyles, useTheme } from '@/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, View } from 'react-native';

export default function CommunityScreen() {
  const styles = useStyles({});
  const theme = useTheme();
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#60a5fa', '#3b82f6']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Heading1 color={theme.colors.white}>Cộng đồng</Heading1>
        <Body1 color={theme.colors.white} style={styles.headerSubtitle}>
          Kết nối với cộng đồng xanh
        </Body1>
      </LinearGradient>
      
      <View style={styles.content}>
        <View style={styles.card}>
          <Heading2 color={theme.colors.neutral100} style={styles.cardTitle}>
            Hoạt động gần đây
          </Heading2>
          <Body1 color={theme.colors.neutral60} style={styles.cardDescription}>
            Cộng đồng đang tích cực tham gia các hoạt động bảo vệ môi trường
          </Body1>
        </View>
        
        <View style={styles.card}>
          <Heading2 color={theme.colors.neutral100} style={styles.cardTitle}>
            Thành viên mới
          </Heading2>
          <Body1 color={theme.colors.neutral60} style={styles.cardDescription}>
            Chào mừng 25 thành viên mới trong tuần này!
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
