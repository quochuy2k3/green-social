# Green Social

Ứng dụng React Native/Expo về môi trường và thời tiết với các tính năng bản đồ tương tác.

## Cấu trúc dự án

```
src/
├── components/           # Shared components
│   ├── ui/              # Basic UI components (WebView, etc.)
│   ├── forms/           # Form components
│   ├── navigation/      # Navigation components
│   └── index.ts         # Barrel exports
├── screens/             # Screen components
│   ├── home/            # Home screens (index, community, store, profile)
│   ├── maps/            # Maps screens (index, windy, greenmap)
│   ├── profile/         # Profile screens và components
│   └── index.ts         # Barrel exports
├── services/            # API services & external integrations
│   ├── api.ts           # Axios configuration
│   ├── # auth.service.ts đã được tích hợp vào AuthContext
│   ├── community.service.ts # Community service class
│   ├── store.service.ts # Store service class
│   ├── maps.service.ts  # Maps service class
│   ├── achievement.service.ts # Achievement service class
│   ├── ServicesProvider.tsx # Services context provider
│   ├── services.ts      # Default services instance
│   ├── mockService.ts   # Mock service for development
│   ├── mockData.ts      # Mock data
│   └── index.ts         # Barrel exports
├── navigation/          # Navigation configuration
│   ├── TabBarIcon.tsx   # Tab bar icon component
│   └── index.ts         # Barrel exports
├── hooks/               # Custom hooks
│   ├── useClientOnlyValue.ts
│   ├── useColorScheme.ts
│   ├── # useAuth.ts đã được tích hợp vào AuthContext
│   ├── useCommunity.ts  # Community hook
│   └── index.ts
├── utils/               # Utility functions
│   ├── webViewCleanup.ts
│   └── index.ts
├── types/               # TypeScript type definitions
│   ├── api.ts           # API types
│   └── index.ts
├── constants/           # App constants & configs
│   ├── Colors.ts
│   ├── api.ts           # API configuration
│   └── index.ts
├── assets/              # Static assets
│   ├── fonts/
│   └── images/
└── __tests__/           # Test files
```

## Tính năng chính

- **Bản đồ thời tiết**: Tích hợp Windy.com với cleanup scripts
- **Bản đồ môi trường**: Tích hợp GreenMap.org với viewbox Việt Nam
- **WebView tối ưu**: Fullscreen WebView với cleanup scripts để loại bỏ UI không cần thiết
- **Navigation**: Tab-based navigation với Expo Router
- **Responsive**: Hỗ trợ cả iOS và Android
- **Mock API**: Sử dụng mock data trong development, sẵn sàng chuyển sang real API

## Công nghệ sử dụng

- **React Native**: 0.81.4
- **Expo**: ~54.0.8
- **Expo Router**: ~6.0.6
- **TypeScript**: ^5.9.2
- **Zustand**: ^5.0.8 (State management)
- **React Query**: ^5.89.0 (Data fetching)
- **Axios**: ^1.12.2 (HTTP client)
- **Bun**: Package manager

## Cài đặt và chạy

```bash
# Cài đặt dependencies với Bun
bun install

# Chạy trên iOS
bun run ios

# Chạy trên Android
bun run android

# Chạy trên Web
bun run web

# Development mode
bun run dev
```

## Cấu trúc import với alias "@"

Dự án sử dụng path alias "@" để import ngắn gọn:

```typescript
// Import components
import { FullscreenWebView } from '@/components';

// Import hooks
import { useColorScheme, useClientOnlyValue } from '@/hooks';

// Import screens
import { WindyScreen, GreenMapScreen } from '@/screens';

// Import services
import { CommunityService } from '@/services/community.service';
// authService đã được tích hợp vào AuthContext

// Import utils
import { createCleanupJS, WINDY_CLEANUP_CONFIG } from '@/utils';

// Import types
import { User, Achievement, MapConfig } from '@/types';

// Import constants
import { API_CONFIG, ENV_CONFIG } from '@/constants';
```

## API Services

Dự án có cấu trúc service layer hoàn chỉnh với:

- **Axios configuration**: Cấu hình interceptors, error handling
- **Service layer**: Tách biệt logic API calls
- **Mock data**: Dữ liệu giả lập cho development
- **Type safety**: TypeScript types cho tất cả API responses

### Sử dụng services với hooks

```typescript
import { useAuth } from '@/contexts/AuthContext';
import { useCommunity } from '@/hooks';

function MyComponent() {
  const {
    user,
    isAuthenticated,
    login,
    logout,
    isLoadingUser,
  } = useAuth();

  const {
    usePosts,
    createPost,
    isCreatingPost,
  } = useCommunity();

  // Get posts with React Query
  const { data: postsData, isLoading: isLoadingPosts } = usePosts(1, 10);

  const handleLogin = () => {
    login({
      email: 'test@example.com',
      password: 'password',
    });
  };

  const handleCreatePost = () => {
    createPost({
      content: 'Hello world! 🌱',
      images: [],
    });
  };

  return (
    <View>
      {isAuthenticated ? (
        <Text>Welcome, {user?.name}!</Text>
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
    </View>
  );
}
```

### Sử dụng services trực tiếp

```typescript
import { useServices } from '@/services/ServicesProvider';

function MyComponent() {
  const { CommunityService } = useServices();

  const handleDirectCall = async () => {
    try {
      // AuthService đã được tích hợp vào AuthContext
      // Sử dụng useAuth() thay vì AuthService
      const posts = await CommunityService.getPosts(1, 10);
      console.log('User:', user);
      console.log('Posts:', posts);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return <Button title="Direct Call" onPress={handleDirectCall} />;
}
```

## Mock Data

Trong development mode, ứng dụng sử dụng mock data thay vì gọi API thật:

- **Mock users**: Dữ liệu người dùng mẫu
- **Mock posts**: Bài viết cộng đồng mẫu
- **Mock products**: Sản phẩm cửa hàng mẫu
- **Mock locations**: Địa điểm bản đồ mẫu
- **Mock achievements**: Thành tích mẫu

Để chuyển sang real API, chỉ cần thay đổi `ENV_CONFIG.USE_MOCK_DATA = false` trong `src/constants/api.ts`.

## WebView Cleanup

Dự án sử dụng cleanup scripts để tối ưu hóa trải nghiệm WebView:

- **Windy Cleanup**: Loại bỏ search, logo, mobile calendar, bottom wrapper
- **GreenMap Cleanup**: Loại bỏ sticky elements, search, toaster list

## Development

```bash
# Type checking
bun run type-check

# Linting
bun run lint

# Build
bun run build
```

## Cấu hình

- **Path aliases**: Cấu hình trong `tsconfig.json` và `babel.config.js`
- **API endpoints**: Cấu hình trong `src/constants/api.ts`
- **Mock data**: Cấu hình trong `src/services/mockData.ts`
