import { Typography } from '@/components/ui/Typography';
import { useCommunity } from '@/hooks';
import { StorageService } from '@/services';
import { makeStyles, useTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
// import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function CreatePostScreen() {
  const theme = useTheme();
  const styles = useStyles({ theme });
  
  const [content, setContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [uploadedImageIds, setUploadedImageIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [postType, setPostType] = useState<'regular' | 'heat'>('regular');
  const [temperature, setTemperature] = useState<string>('');
  const [heatSeverity, setHeatSeverity] = useState<'low' | 'medium' | 'high'>('medium');
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  
  const textInputRef = useRef<TextInput>(null);
  const storageService = new StorageService();
  
  const { createPost } = useCommunity();

  const canSubmit = content.trim().length > 0 && !isLoading && !isUploading;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    
    try {
      setIsLoading(true);
      
      const success = await createPost(
        content.trim(), 
        uploadedImageIds.length > 0 ? uploadedImageIds : undefined,
        location ? { lat: location.lat, lng: location.lng } : undefined,
        postType === 'heat',
        postType === 'heat' && temperature ? parseFloat(temperature) : undefined,
        postType === 'heat' ? heatSeverity : undefined
      );
      
      if (success) {
        setContent('');
        setSelectedImages([]);
        setUploadedImageIds([]);
        setPostType('regular');
        setTemperature('');
        setHeatSeverity('medium');
        setLocation(null);
        
        router.back();
        
        Alert.alert('Thành công', 'Bài viết đã được đăng thành công!');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể đăng bài viết. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Cần quyền truy cập', 'Cần quyền truy cập thư viện ảnh để thêm hình ảnh');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets) {
        setIsUploading(true);
        
        const newImages: string[] = [];
        const newUploadIds: string[] = [];
        
        for (const asset of result.assets) {
          const uploadId = `temp_${Date.now()}_${Math.random()}`;
          newImages.push(asset.uri);
          newUploadIds.push(uploadId);
        }
        
        setSelectedImages(prev => [...prev, ...newImages]);
        setUploadedImageIds(prev => [...prev, ...newUploadIds]);
        
        setIsUploading(false);
      }
    } catch (error) {
      setIsUploading(false);
      Alert.alert('Lỗi', 'Không thể thêm hình ảnh');
    }
  };

  const handleAddLocation = async () => {
    // TODO: Implement location picker when expo-location is installed
    Alert.alert('Thêm vị trí', 'Tính năng thêm vị trí sẽ được phát triển');
    
    // Uncomment when expo-location is installed:
    /*
    try {
      const permissionResult = await Location.requestForegroundPermissionsAsync();
      
      if (permissionResult.status !== 'granted') {
        Alert.alert('Cần quyền truy cập', 'Cần quyền truy cập vị trí để thêm địa điểm');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      
      if (currentLocation) {
        setLocation({
          lat: currentLocation.coords.latitude,
          lng: currentLocation.coords.longitude,
        });
        
        Alert.alert('Thành công', 'Đã thêm vị trí hiện tại vào bài viết');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lấy vị trí hiện tại');
    }
    */
  };

  const handleAddTag = () => {
    Alert.alert('Thêm thẻ tag', 'Tính năng thêm thẻ tag sẽ được phát triển');
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setUploadedImageIds(prev => prev.filter((_, i) => i !== index));
  };

  const handlePostTypeChange = (type: 'regular' | 'heat') => {
    setPostType(type);
    if (type === 'regular') {
      setTemperature('');
      setHeatSeverity('medium');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
          <Typography variant="body1" color={theme.colors.neutral60}>
            Hủy
          </Typography>
        </TouchableOpacity>
        
        <Typography variant="h3" weight="bold" color={theme.colors.neutral100}>
          Tạo bài viết
        </Typography>
        
        <TouchableOpacity
          style={[
            styles.publishButton,
            !canSubmit && styles.publishButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!canSubmit}
        >
          <Typography 
            variant="body1" 
            weight="semibold" 
            color={canSubmit ? theme.colors.white : theme.colors.neutral50}
          >
            {isLoading ? 'Đang đăng...' : 'Đăng'}
          </Typography>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Post Type Selection */}
          <View style={styles.postTypeContainer}>
            <Typography variant="body2" weight="semibold" color={theme.colors.neutral100} style={styles.sectionTitle}>
              Loại bài viết
            </Typography>
            <View style={styles.postTypeButtons}>
              <TouchableOpacity
                style={[
                  styles.postTypeButton,
                  postType === 'regular' && styles.postTypeButtonActive,
                ]}
                onPress={() => handlePostTypeChange('regular')}
              >
                <Ionicons 
                  name="chatbubble-outline" 
                  size={20} 
                  color={postType === 'regular' ? theme.colors.white : theme.colors.brand90} 
                />
                <Typography 
                  variant="body2" 
                  weight="medium" 
                  color={postType === 'regular' ? theme.colors.white : theme.colors.brand90}
                  style={styles.postTypeButtonText}
                >
                  Bài viết thường
                </Typography>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.postTypeButton,
                  postType === 'heat' && styles.postTypeButtonActive,
                ]}
                onPress={() => handlePostTypeChange('heat')}
              >
                <Ionicons 
                  name="thermometer-outline" 
                  size={20} 
                  color={postType === 'heat' ? theme.colors.white : theme.colors.brand90} 
                />
                <Typography 
                  variant="body2" 
                  weight="medium" 
                  color={postType === 'heat' ? theme.colors.white : theme.colors.brand90}
                  style={styles.postTypeButtonText}
                >
                  Báo cáo nhiệt độ
                </Typography>
              </TouchableOpacity>
            </View>
          </View>

          {/* Heat Report Fields */}
          {postType === 'heat' && (
            <View style={styles.heatReportContainer}>
              <Typography variant="body2" weight="semibold" color={theme.colors.neutral100} style={styles.sectionTitle}>
                Thông tin nhiệt độ
              </Typography>
              
              <View style={styles.temperatureRow}>
                <View style={styles.temperatureInputContainer}>
                  <Typography variant="caption" color={theme.colors.neutral60} style={styles.inputLabel}>
                    Nhiệt độ (°C)
                  </Typography>
                  <TextInput
                    style={styles.temperatureInput}
                    placeholder="35"
                    placeholderTextColor={theme.colors.neutral50}
                    value={temperature}
                    onChangeText={setTemperature}
                    keyboardType="numeric"
                    maxLength={3}
                  />
                </View>
                
                <View style={styles.severityContainer}>
                  <Typography variant="caption" color={theme.colors.neutral60} style={styles.inputLabel}>
                    Mức độ
                  </Typography>
                  <View style={styles.severityButtons}>
                    {(['low', 'medium', 'high'] as const).map((severity) => (
                      <TouchableOpacity
                        key={severity}
                        style={[
                          styles.severityButton,
                          heatSeverity === severity && styles.severityButtonActive,
                        ]}
                        onPress={() => setHeatSeverity(severity)}
                      >
                        <Typography 
                          variant="caption" 
                          weight="medium" 
                          color={heatSeverity === severity ? theme.colors.white : theme.colors.neutral60}
                        >
                          {severity === 'low' ? 'Thấp' : severity === 'medium' ? 'Trung bình' : 'Cao'}
                        </Typography>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* User Info */}
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={24} color={theme.colors.brand90} />
            </View>
            <View style={styles.userDetails}>
              <Typography variant="body1" weight="semibold" color={theme.colors.neutral100}>
                Người dùng của bạn
              </Typography>
              <Typography variant="caption" color={theme.colors.neutral60}>
                Chia sẻ với cộng đồng
              </Typography>
            </View>
          </View>

          {/* Text Input */}
          <TextInput
            ref={textInputRef}
            style={styles.textInput}
            placeholder={postType === 'heat' ? "Mô tả tình trạng nhiệt độ..." : "Bạn đang nghĩ gì?"}
            placeholderTextColor={theme.colors.neutral50}
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
            maxLength={2000}
            autoFocus
          />

          {/* Character Count */}
          <View style={styles.characterCount}>
            <Typography variant="caption" color={theme.colors.neutral50}>
              {content.length}/2000
            </Typography>
          </View>

          {/* Selected Images */}
          {selectedImages.length > 0 && (
            <View style={styles.imagesContainer}>
              <Typography variant="body2" weight="semibold" color={theme.colors.neutral100} style={styles.imagesTitle}>
                Hình ảnh đã chọn ({selectedImages.length})
              </Typography>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagesScroll}>
                {selectedImages.map((imageUri, index) => (
                  <View key={index} style={styles.imageItem}>
                    <Image source={{ uri: imageUri }} style={styles.selectedImage} />
                    <TouchableOpacity
                      style={styles.removeImageButton}
                      onPress={() => handleRemoveImage(index)}
                    >
                      <Ionicons name="close-circle" size={20} color={theme.colors.error100} />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Selected Location */}
          {location && (
            <View style={styles.locationContainer}>
              <Typography variant="body2" weight="semibold" color={theme.colors.neutral100} style={styles.locationTitle}>
                Vị trí đã chọn
              </Typography>
              <View style={styles.locationInfo}>
                <Ionicons name="location" size={16} color={theme.colors.brand90} />
                <Typography variant="body2" color={theme.colors.neutral80} style={styles.locationText}>
                  Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
                </Typography>
                <TouchableOpacity
                  style={styles.removeLocationButton}
                  onPress={() => setLocation(null)}
                >
                  <Ionicons name="close-circle" size={20} color={theme.colors.error100} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, isUploading && styles.actionButtonDisabled]} 
              onPress={handleAddImage}
              disabled={isUploading}
            >
              <Ionicons name="image-outline" size={20} color={theme.colors.brand90} />
              <Typography variant="body2" color={theme.colors.brand90} weight="medium" style={styles.actionText}>
                {isUploading ? 'Đang tải...' : 'Thêm hình ảnh'}
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleAddLocation}>
              <Ionicons name="location-outline" size={20} color={theme.colors.brand90} />
              <Typography variant="body2" color={theme.colors.brand90} weight="medium" style={styles.actionText}>
                Thêm vị trí
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleAddTag}>
              <Ionicons name="pricetag-outline" size={20} color={theme.colors.brand90} />
              <Typography variant="body2" color={theme.colors.brand90} weight="medium" style={styles.actionText}>
                Thêm thẻ tag
              </Typography>
            </TouchableOpacity>
          </View>

          {/* Tips */}
          <View style={styles.tipsContainer}>
            <Typography variant="body2" weight="semibold" color={theme.colors.neutral100} style={styles.tipsTitle}>
              💡 Mẹo viết bài hay:
            </Typography>
            {postType === 'heat' ? (
              <>
                <Typography variant="caption" color={theme.colors.neutral60} style={styles.tipItem}>
                  • Mô tả chi tiết tình trạng nhiệt độ tại vị trí
                </Typography>
                <Typography variant="caption" color={theme.colors.neutral60} style={styles.tipItem}>
                  • Chia sẻ ảnh về môi trường xung quanh
                </Typography>
                <Typography variant="caption" color={theme.colors.neutral60} style={styles.tipItem}>
                  • Đưa ra lời khuyên cho người khác
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="caption" color={theme.colors.neutral60} style={styles.tipItem}>
                  • Chia sẻ kinh nghiệm thực tế về môi trường
                </Typography>
                <Typography variant="caption" color={theme.colors.neutral60} style={styles.tipItem}>
                  • Đăng ảnh về hoạt động xanh của bạn
                </Typography>
                <Typography variant="caption" color={theme.colors.neutral60} style={styles.tipItem}>
                  • Khuyến khích mọi người cùng hành động
                </Typography>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral20,
    backgroundColor: theme.colors.white,
  },
  cancelButton: {
    padding: theme.spacing.sm,
  },
  publishButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.border.radius.full,
    backgroundColor: theme.colors.brand90,
    minWidth: 60,
    alignItems: 'center',
  },
  publishButtonDisabled: {
    backgroundColor: theme.colors.neutral30,
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: theme.spacing.base,
  },
  postTypeContainer: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.base,
  },
  sectionTitle: {
    marginBottom: theme.spacing.sm,
  },
  postTypeButtons: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  postTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.base,
    paddingHorizontal: theme.spacing.base,
    borderRadius: theme.border.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.brand90,
    backgroundColor: theme.colors.white,
  },
  postTypeButtonActive: {
    backgroundColor: theme.colors.brand90,
    borderColor: theme.colors.brand90,
  },
  postTypeButtonText: {
    marginLeft: theme.spacing.sm,
  },
  heatReportContainer: {
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.neutral10,
    borderRadius: theme.border.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.neutral20,
  },
  temperatureRow: {
    flexDirection: 'row',
    gap: theme.spacing.base,
  },
  temperatureInputContainer: {
    flex: 1,
  },
  inputLabel: {
    marginBottom: theme.spacing.xs,
  },
  temperatureInput: {
    borderWidth: 1,
    borderColor: theme.colors.neutral30,
    borderRadius: theme.border.radius.base,
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.sm,
    fontSize: 16,
    color: theme.colors.neutral100,
    backgroundColor: theme.colors.white,
  },
  severityContainer: {
    flex: 1,
  },
  severityButtons: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  severityButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.border.radius.base,
    borderWidth: 1,
    borderColor: theme.colors.neutral30,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
  },
  severityButtonActive: {
    backgroundColor: theme.colors.brand90,
    borderColor: theme.colors.brand90,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.neutral10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.base,
  },
  userDetails: {
    flex: 1,
  },
  textInput: {
    fontSize: 18,
    color: theme.colors.neutral100,
    minHeight: 120,
    textAlignVertical: 'top',
    marginTop: theme.spacing.lg,
  },
  characterCount: {
    alignItems: 'flex-end',
    marginTop: theme.spacing.sm,
  },
  imagesContainer: {
    marginTop: theme.spacing.lg,
  },
  imagesTitle: {
    marginBottom: theme.spacing.base,
  },
  imagesScroll: {
    flexDirection: 'row',
  },
  imageItem: {
    marginRight: theme.spacing.base,
    position: 'relative',
  },
  selectedImage: {
    width: 80,
    height: 80,
    borderRadius: theme.border.radius.base,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: theme.colors.white,
    borderRadius: 10,
  },
  locationContainer: {
    marginTop: theme.spacing.lg,
    padding: theme.spacing.base,
    backgroundColor: theme.colors.neutral10,
    borderRadius: theme.border.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.neutral20,
  },
  locationTitle: {
    marginBottom: theme.spacing.sm,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  locationText: {
    flex: 1,
  },
  removeLocationButton: {
    padding: theme.spacing.xs,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
  },
  actionButtonDisabled: {
    opacity: 0.5,
  },
  actionText: {
    marginLeft: theme.spacing.sm,
  },
  tipsContainer: {
    marginTop: theme.spacing.xl,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.neutral10,
    borderRadius: theme.border.radius.lg,
    marginBottom: theme.spacing.xl,
  },
  tipsTitle: {
    marginBottom: theme.spacing.base,
  },
  tipItem: {
    marginBottom: theme.spacing.xs,
  },
}));