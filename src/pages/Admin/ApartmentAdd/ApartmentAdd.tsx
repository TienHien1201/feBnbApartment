import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  IconButton
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'
import { useMutation, useQuery } from '@tanstack/react-query'
import productApi from '../../../apis/product.api'
import { uploadImageToCloudinary } from '../../../apis/cloudinary.api'
import { useNavigate } from 'react-router-dom'
import path from '../../../constants/path'
import { toast } from 'react-toastify'
import {
  Home as HomeIcon,
  Apartment as ApartmentIcon,
  Category as CategoryIcon,
  Description as DescriptionIcon,
  Build as BuildIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  SquareFoot as SquareFootIcon,
  AttachMoney as MoneyIcon,
  Navigation as NavigationIcon,
  Save as SaveIcon
} from '@mui/icons-material'
import { ProductListConfig } from '../../../types/product.type'

// Validation schema
const schema = yup.object().shape({
  ten_toa_can_ho: yup.string().required('Tên tòa căn hộ không được để trống'),
  ten_can_ho: yup.string().required('Tên căn hộ không được để trống'),
  loai_can_ho: yup.string().required('Loại căn hộ không được để trống'),
  chu_thich: yup.string(),
  tinh_trang_can_ho: yup.string().required('Tình trạng căn hộ không được để trống'),
  loai_kinh_doanh: yup.string().required('Loại kinh doanh không được để trống'),
  ma_phan_khu: yup.number().required('Mã phân khu không được để trống'),
  dien_tich: yup.string().required('Diện tích không được để trống'),
  gia_thu_ve: yup.number().required('Giá thu về không được để trống'),
  gia_ban: yup.number().required('Giá bán không được để trống'),
  huong: yup.string().required('Hướng không được để trống')
})

interface FormValues {
  ten_toa_can_ho: string
  ten_can_ho: string
  loai_can_ho: string
  chu_thich: string
  tinh_trang_can_ho: string
  loai_kinh_doanh: string
  ma_phan_khu: number
  dien_tich: string
  gia_thu_ve: number
  gia_ban: number
  huong: string
}

export default function ApartmentAdd() {
  const [images, setImages] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      loai_kinh_doanh: 'Thuê',
      loai_can_ho: '1br1wc', // Add default value
      tinh_trang_can_ho: 'Thô', // Add default value
      ten_toa_can_ho: '',
      ten_can_ho: '',
      chu_thich: '',
      ma_phan_khu: 0,
      dien_tich: '',
      gia_thu_ve: 0,
      gia_ban: 0,
      huong: ''
    }
  })

  const { data: allDataProduct } = useQuery({
    queryKey: ['can-ho'],
    queryFn: () => productApi.getProducts({} as ProductListConfig)
  })

  console.log(allDataProduct?.data)

  const addProductMutation = useMutation({
    mutationFn: productApi.addProduct,
    onSuccess: () => {
      toast.success('Thêm căn hộ thành công!')
      navigate(path.product)
    },
    onError: (error) => {
      console.error('Error adding apartment:', error)
      toast.error('Có lỗi xảy ra khi thêm căn hộ')
    }
  })

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const validFiles = Array.from(files).filter((file) => {
        // Kiểm tra kích thước (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} quá lớn (>5MB)`)
          return false
        }
        // Kiểm tra định dạng
        if (!file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
          toast.error(`${file.name} không phải định dạng ảnh hợp lệ`)
          return false
        }
        return true
      })

      if (validFiles.length > 0) {
        setImages((prev) => [...prev, ...validFiles])
        // Tạo preview URLs
        const newUrls = validFiles.map((file) => URL.createObjectURL(file))
        setImageUrls((prev) => [...prev, ...newUrls])
      }
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
    setImageUrls((prev) => {
      // Clean up URL
      URL.revokeObjectURL(prev[index])
      return prev.filter((_, i) => i !== index)
    })
  }

  const onSubmit = async (data: FormValues) => {
    try {
      if (images.length === 0) {
        toast.error('Vui lòng chọn ít nhất một ảnh')
        return
      }

      const loadingToast = toast.loading('Đang xử lý...')

      try {
        // Upload từng ảnh và lưu URL ngay lập tức
        const uploadedUrls: string[] = []

        for (const image of images) {
          try {
            const url = await uploadImageToCloudinary(image)
            uploadedUrls.push(url)
            console.log(`Uploaded ${image.name}:`, url)
          } catch (error) {
            console.error(`Failed to upload ${image.name}:`, error)
            toast.error(`Lỗi khi tải lên ảnh ${image.name}`)
            toast.dismiss(loadingToast)
            return
          }
        }

        // Chuẩn bị dữ liệu sản phẩm với hình ảnh
        const productData = {
          ...data,
          hinh_anh_can_ho: uploadedUrls.map((url) => ({
            duong_dan_hinh: url
          }))
        }

        // Gọi API để thêm sản phẩm
        const result = await addProductMutation.mutateAsync(productData)

        toast.dismiss(loadingToast)
        toast.success('Thêm căn hộ thành công!')
        navigate(path.product)
      } catch (error: any) {
        toast.dismiss(loadingToast)
        console.error('Error during product creation:', error)
        const errorMessage = error?.response?.data?.message || 'Có lỗi xảy ra khi thêm sản phẩm'
        toast.error(errorMessage)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error('Có lỗi xảy ra khi xử lý form')
    }
  }

  const renderTextField = (name: keyof FormValues, label: string, icon: React.ReactNode, options?: any) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          {...options}
          fullWidth
          label={label}
          error={Boolean(errors[name])}
          helperText={errors[name]?.message}
          InputProps={{
            startAdornment: <InputAdornment position='start'>{icon}</InputAdornment>
          }}
        />
      )}
    />
  )

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <ApartmentIcon color='primary' sx={{ fontSize: 40 }} />
          <Typography variant='h4' color='primary'>
            Thêm Căn Hộ Mới
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {renderTextField('ten_toa_can_ho', 'Tên tòa căn hộ', <HomeIcon color='primary' />)}
            </Grid>

            <Grid item xs={12} md={6}>
              {renderTextField('ten_can_ho', 'Tên căn hộ', <ApartmentIcon color='primary' />)}
            </Grid>

            <Grid item xs={12} md={6}>
              {renderTextField('loai_can_ho', 'Loại căn hộ', <CategoryIcon color='primary' />, {
                select: true,
                children: [
                  <MenuItem value='1br1wc'>1BR1WC</MenuItem>,
                  <MenuItem value='2br2wc'>2BR2WC</MenuItem>,
                  <MenuItem value='2br2wc plus'>2BR2WC Plus</MenuItem>,
                  <MenuItem value='3br2wc'>3BR2WC</MenuItem>
                ]
              })}
            </Grid>

            <Grid item xs={12} md={6}>
              {renderTextField('tinh_trang_can_ho', 'Tình trạng căn hộ', <BuildIcon color='primary' />, {
                select: true,
                children: [
                  <MenuItem value='Thô'>Thô</MenuItem>,
                  <MenuItem value='Full nội thất'>Full nội thất</MenuItem>,
                  <MenuItem value='Bếp + Rèm'>Bếp + Rèm</MenuItem>
                ]
              })}
            </Grid>

            <Grid item xs={12} md={6}>
              {renderTextField('loai_kinh_doanh', 'Loại kinh doanh', <BusinessIcon color='primary' />, {
                select: true,
                children: [<MenuItem value='Thuê'>Thuê</MenuItem>, <MenuItem value='Bán'>Bán</MenuItem>]
              })}
            </Grid>

            <Grid item xs={12} md={6}>
              {renderTextField('ma_phan_khu', 'Mã phân khu', <LocationIcon color='primary' />, {
                type: 'number'
              })}
            </Grid>

            <Grid item xs={12}>
              {renderTextField('chu_thich', 'Chú thích', <DescriptionIcon color='primary' />, {
                multiline: true,
                rows: 3
              })}
            </Grid>

            <Grid item xs={12} md={4}>
              {renderTextField('dien_tich', 'Diện tích (m²)', <SquareFootIcon color='primary' />)}
            </Grid>

            <Grid item xs={12} md={4}>
              {renderTextField('gia_thu_ve', 'Giá thu về', <MoneyIcon color='primary' />, {
                type: 'number'
              })}
            </Grid>

            <Grid item xs={12} md={4}>
              {renderTextField('gia_ban', 'Giá bán', <MoneyIcon color='primary' />, {
                type: 'number'
              })}
            </Grid>

            <Grid item xs={12} md={4}>
              {renderTextField('huong', 'Hướng', <NavigationIcon color='primary' />)}
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
                  <input
                    accept='image/*'
                    style={{ display: 'none' }}
                    id='image-upload'
                    type='file'
                    multiple
                    onChange={handleImageUpload}
                  />
                  <label htmlFor='image-upload'>
                    <Button
                      variant='outlined'
                      component='span'
                      startIcon={<CloudUploadIcon />}
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      Tải ảnh lên
                    </Button>
                  </label>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {imageUrls.map((url, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: 'relative',
                      '&:hover .delete-button': {
                        opacity: 1
                      }
                    }}
                  >
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: 'cover',
                        borderRadius: 8
                      }}
                    />
                    <IconButton
                      size='small'
                      onClick={() => removeImage(index)}
                      className='delete-button'
                      sx={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        opacity: 0,
                        transition: 'opacity 0.2s',
                        backgroundColor: 'white',
                        '&:hover': {
                          backgroundColor: 'white',
                          color: 'error.main'
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button variant='outlined' onClick={() => window.history.back()} startIcon={<DeleteIcon />}>
                  Hủy
                </Button>
                <Button type='submit' variant='contained' color='primary' startIcon={<SaveIcon />}>
                  Thêm căn hộ
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}
