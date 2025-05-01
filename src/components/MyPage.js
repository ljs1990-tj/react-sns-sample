import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Avatar, Grid, Paper, Dialog, DialogTitle, DialogContent, Button, DialogActions } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

function MyPage() {
  let [info, setInfo] = useState({userName : "", eamil : "", intro : "", profileImg : ""});
  let [open, setOpen] = useState(false);
  let [imgUrl, setImgUrl] = useState();
  const [insertFile, setFile] = useState();
  const token = localStorage.getItem("token"); 
  
  const fnUserInfo = ()=>{
    if(!token){
      // 다시 로그인 페이지로 이동
      // navigate("/");
    }
    const sessionUser = jwtDecode(token);
    fetch("http://localhost:3005/member/"+sessionUser.sessionEmail)
    .then(res => res.json())
    .then(data => {
      setInfo(data.info);
    });
  }

  const selectImg = (e)=>{
    const file = e.target.files[0];
    if(file) {
      const imgUrl = URL.createObjectURL(file);
      setImgUrl(imgUrl);
      setFile(file);
    }
  }

  const fnSaveImg = ()=>{
    const formData = new FormData();
    formData.append("file", insertFile); 
    formData.append("email", info.email);
    fetch("http://localhost:3005/member/upload", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      alert("저장 됐나?");
      setOpen(false);
    })
    .catch(err => {
      console.error(err);
    });
  }

  useEffect(()=>{
    fnUserInfo();
  }, [])

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        minHeight="100vh"
        sx={{ padding: '20px' }}
      >
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '15px', width: '100%' }}>
          {/* 프로필 정보 상단 배치 */}
          <Box display="flex" flexDirection="column" alignItems="center" sx={{ marginBottom: 3 }}>
            <Avatar
              alt="프로필 이미지"
              src={info.profileImg ? "http://localhost:3005/"+info.profileImg : "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"} // 프로필 이미지 경로
              sx={{ width: 100, height: 100, marginBottom: 2 }}
              onClick={()=>{setOpen(!open)}}
            />
            <Typography variant="h5">{info.userName}</Typography>
            <Typography variant="body2" color="text.secondary">
              {info.email}
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">팔로워</Typography>
              <Typography variant="body1">150</Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">팔로잉</Typography>
              <Typography variant="body1">100</Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">게시물</Typography>
              <Typography variant="body1">50</Typography>
            </Grid>
          </Grid>
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h6">내 소개</Typography>
            <Typography variant="body1">
              {info.intro}
            </Typography>
          </Box>
        </Paper>
        <Dialog open={open}>
          <DialogTitle>이미지 수정!</DialogTitle>
          <DialogContent>
            <label>
              <input onChange={selectImg} type="file" accept="image/*" style={{display : "none"}}></input>
              <Button variant='contained' component="span">이미지 선택</Button>
              {!imgUrl ? " 선택된 파일 없음" : " 이미지 선택 됨"}
            </label>
          </DialogContent>
          {imgUrl && (
            <Box mt={2}>
              <Typography variant='h5' sx={{marginLeft : 3}}>미리보기</Typography>
              <Avatar
                alt="미리보기"
                src={imgUrl}
                sx={{ width: 100, height: 100, marginTop: 1, marginLeft : 3 }}
                onClick={()=>{setOpen(!open)}}
              />
            </Box>
          )}
          <DialogActions>
            <Button variant='contained' onClick={fnSaveImg}>저장</Button>
            <Button variant='outlined' onClick={()=>{
              setOpen(false);
              setImgUrl(null);
            }}>취소</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}

export default MyPage;