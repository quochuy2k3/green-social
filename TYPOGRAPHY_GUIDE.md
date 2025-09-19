# Typography System - Green Social App

## Tổng quan

Dự án Green Social đã được cập nhật với hệ thống typography hiện đại sử dụng **Inter font** - một font được thiết kế đặc biệt cho UI/UX, mang lại trải nghiệm đọc tốt nhất trên màn hình di động.

## Font được sử dụng

### Inter Font Family
- **Inter-Light** (300) - Cho text nhẹ nhàng
- **Inter-Regular** (400) - Cho body text chính
- **Inter-Medium** (500) - Cho text quan trọng
- **Inter-SemiBold** (600) - Cho headings nhỏ
- **Inter-Bold** (700) - Cho headings lớn

## Cách sử dụng

### 1. Typography Components

```tsx
import { 
  Typography, 
  Heading1, 
  Heading2, 
  Heading3, 
  Heading4, 
  Heading5, 
  Heading6,
  Body1, 
  Body2, 
  Caption, 
  Overline, 
  ButtonText, 
  Label 
} from '@/components/ui';

// Sử dụng component Typography chính
<Typography variant="h1" weight="bold" color={theme.colors.brand100}>
  Tiêu đề chính
</Typography>

// Sử dụng các component convenience
<Heading1 color={theme.colors.neutral100}>
  Tiêu đề cấp 1
</Heading1>

<Body1 color={theme.colors.neutral70}>
  Đoạn văn bản chính
</Body1>
```

### 2. Typography Variants

| Variant | Font Size | Font Weight | Sử dụng |
|---------|-----------|-------------|---------|
| `h1` | 48px | Bold | Tiêu đề chính |
| `h2` | 36px | Bold | Tiêu đề phụ |
| `h3` | 32px | SemiBold | Tiêu đề section |
| `h4` | 28px | SemiBold | Tiêu đề subsection |
| `h5` | 24px | Medium | Tiêu đề nhỏ |
| `h6` | 20px | Medium | Tiêu đề rất nhỏ |
| `body1` | 16px | Regular | Văn bản chính |
| `body2` | 14px | Regular | Văn bản phụ |
| `caption` | 12px | Regular | Chú thích |
| `overline` | 10px | Medium | Nhãn đặc biệt |
| `button` | 16px | Medium | Text button |
| `label` | 14px | Medium | Label form |

### 3. Font Weights

```tsx
<Typography weight="light">Light text</Typography>
<Typography weight="regular">Regular text</Typography>
<Typography weight="medium">Medium text</Typography>
<Typography weight="semibold">SemiBold text</Typography>
<Typography weight="bold">Bold text</Typography>
```

### 4. Colors

Sử dụng theme colors để đảm bảo consistency:

```tsx
import { useTheme } from '@/theme';

const theme = useTheme();

<Typography color={theme.colors.brand100}>Brand color</Typography>
<Typography color={theme.colors.neutral100}>Primary text</Typography>
<Typography color={theme.colors.neutral70}>Secondary text</Typography>
<Typography color={theme.colors.neutral60}>Tertiary text</Typography>
```

### 5. Utility Functions

```tsx
import { getFontFamily, getFontSize, getLineHeight } from '@/utils';

// Lấy font family theo weight
const fontFamily = getFontFamily('bold'); // 'Inter-Bold'

// Lấy font size
const fontSize = getFontSize('lg'); // 20

// Lấy line height
const lineHeight = getLineHeight('lg'); // 32
```

## Best Practices

### 1. Hierarchy
- Sử dụng `Heading1` cho tiêu đề chính của page
- Sử dụng `Heading2-H6` cho các tiêu đề phụ theo thứ tự
- Sử dụng `Body1` cho nội dung chính
- Sử dụng `Body2` cho nội dung phụ

### 2. Colors
- `neutral100` cho text chính
- `neutral70` cho text phụ
- `neutral60` cho text thứ cấp
- `brand100` cho text nhấn mạnh
- `error100`, `warning100`, `success100` cho các trạng thái

### 3. Spacing
- Kết hợp với theme spacing để tạo layout nhất quán
- Sử dụng `marginBottom` cho spacing giữa các text elements

### 4. Accessibility
- Đảm bảo contrast ratio đủ cao
- Sử dụng font size phù hợp cho mobile
- Test trên các thiết bị khác nhau

## Migration từ Text cũ

### Trước (cũ):
```tsx
<Text style={styles.title}>Tiêu đề</Text>
```

### Sau (mới):
```tsx
<Heading1 color={theme.colors.neutral100}>Tiêu đề</Heading1>
```

## Demo Component

Sử dụng `TypographyDemo` component để xem tất cả các variants:

```tsx
import { TypographyDemo } from '@/components/ui';

// Trong screen của bạn
<TypographyDemo />
```

## Lợi ích

1. **Consistency**: Tất cả text trong app sử dụng cùng một font system
2. **Maintainability**: Dễ dàng thay đổi typography toàn bộ app
3. **Performance**: Inter font được tối ưu cho mobile
4. **Accessibility**: Font dễ đọc trên mọi kích thước màn hình
5. **Modern**: Typography hiện đại, phù hợp với xu hướng thiết kế 2024
