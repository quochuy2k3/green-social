import { AnimatedButton, AnimatedCard, Body1, Body2, Heading1, Heading2 } from '@/components/ui';
import { useHaptic } from '@/hooks';
import { makeStyles, useTheme } from '@/theme';
import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

interface MapCardProps {
  href: '/(maps)/windy' | '/(maps)/greenmap';
  icon: string;
  iconColor: string;
  title: string;
  description: string;
  variant: 'glass' | 'gradient';
  iconBgColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  chevronColor?: string;
}

const MapCard = ({ 
  href, 
  icon, 
  iconColor, 
  title, 
  description, 
  variant, 
  iconBgColor,
  titleColor,
  descriptionColor,
  chevronColor 
}: MapCardProps) => {
  const { light } = useHaptic();
  const theme = useTheme();
  const styles = useStyles({});
  
  return (
    <Link href={href} asChild>
      <Pressable onPress={light}>
        <AnimatedCard variant={variant} style={styles.cardContainer}>
          <View style={styles.cardContent}>
            <View style={[styles.iconContainer, iconBgColor && { backgroundColor: iconBgColor }]}>
              <Feather name={icon as any} size={24} color={iconColor} />
            </View>
            <View style={styles.textContainer}>
              <Heading2 color={titleColor || theme.colors.neutral100} style={styles.cardTitle}>
                {title}
              </Heading2>
              <Body2 color={descriptionColor || theme.colors.neutral60}>
                {description}
              </Body2>
            </View>
            <Feather name="chevron-right" size={20} color={chevronColor || "#a3a3a3"} />
          </View>
        </AnimatedCard>
      </Pressable>
    </Link>
  );
};

const InfoCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => {
  const theme = useTheme();
  const styles = useStyles({});
  
  return (
    <AnimatedCard variant="default" style={styles.infoCard}>
      <View style={styles.infoHeader}>
        <View style={styles.infoIconContainer}>
          <Feather name={icon as any} size={20} color="#34d399" />
        </View>
        <Heading2 color={theme.colors.neutral100}>
          {title}
        </Heading2>
      </View>
      <Body2 color={theme.colors.neutral60}>
        {description}
      </Body2>
    </AnimatedCard>
  );
};

export default function HomeIndex() {
  const styles = useStyles({});
  const theme = useTheme();
  const { light } = useHaptic();
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeInUp.duration(800)}>
        <LinearGradient
          colors={['#34d399', '#10b981']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Heading1 color={theme.colors.white}>🌱 Green Social</Heading1>
          <Body1 color={theme.colors.white} style={styles.headerSubtitle}>
            Kết nối với thiên nhiên và cộng đồng
          </Body1>
        </LinearGradient>
      </Animated.View>
      
      <View style={styles.content}>
        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
          <Heading2 color={theme.colors.neutral100} style={styles.sectionTitle}>
            🗺️ Bản đồ có sẵn
          </Heading2>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.delay(400).duration(600)}>
          <MapCard
            href="/(maps)/windy"
            icon="thermometer"
            iconColor="#0ea5e9"
            title="Temperature Map"
            description="Bản đồ nhiệt độ theo từng địa phương"
            variant="glass"
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600).duration(600)}>
          <MapCard
            href="/(maps)/greenmap"
            icon="map-pin"
            iconColor="#FFFFFF"
            title="Green Map"
            description="Bản đồ môi trường với viewbox Việt Nam"
            variant="gradient"
            iconBgColor={theme.colors.success20}
            titleColor={theme.colors.white}
            descriptionColor="rgba(255,255,255,0.8)"
            chevronColor="rgba(255,255,255,0.7)"
          />
        </Animated.View>
        
        <Animated.View entering={FadeInDown.delay(800).duration(600)}>
          <InfoCard
            icon="info"
            title="Thông tin"
            description="Các bản đồ được hiển thị trong WebView với khả năng zoom và pan mượt mà. Nếu iframe bị chặn, bạn có thể sử dụng nút 'Mở trình duyệt' để xem trực tiếp trên web."
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(1000).duration(600)} style={styles.buttonContainer}>
          <AnimatedButton
            title="🚀 Khám phá thêm"
            variant="success"
            size="large"
            onPress={light}
            style={styles.exploreButton}
          />
        </Animated.View>
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
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    marginBottom: theme.spacing.xs,
  },
  infoCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.border.radius.xl,
    padding: theme.spacing.base,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
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
  buttonContainer: {
    marginTop: theme.spacing.base,
    alignItems: 'center',
  },
  exploreButton: {
    width: '100%',
    maxWidth: 300,
  },
}));
