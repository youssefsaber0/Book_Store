// export default function DownloadReport() {
//   function downloadRandomImage() {
//     //url
//     fetch('a.pdf').then((response) => {
//       console.log(response?.headers);
//       const filename = response?.headers?.get('Content-Disposition')?.split('filename=')[1];
//       response.blob().then((blob) => {
//         let url = window.URL.createObjectURL(blob);
//         let a = document.createElement('a');
//         a.href = url;
//         a.download = filename as string;
//         a.click();
//       });
//     });
//   }
//   return (
//     <div>
//       <h3>Download a random file</h3>
//       <button onClick={downloadRandomImage}>Download</button>
//     </div>
//   );
// }
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Grid, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { ReportingEndPoint } from 'Frontend/generated/endpoints';
// import { saveAs } from 'file-saver';

type userProps = {
  name: string;
};
function Report({ name }: userProps) {
  function downloadRandomReport() {
    downloadBestSellersReport();
  }
  function downloadBookSalesReport() {
    ReportingEndPoint.downloadBookSalesReport().then((dataUrl) => {
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUrl as string);
      linkElement.setAttribute('download', 'BookSalesReport');
      linkElement.click();
    });
  }
  function downloadBestSellersReport() {
    ReportingEndPoint.downloadBestSellersReport().then((dataUrl) => {
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUrl as string);
      linkElement.setAttribute('download', 'BestSellersReport');
      linkElement.click();
    });
  }
  function downloadTopCustomersReport() {
    ReportingEndPoint.downloadTopCustomersReport().then((dataUrl) => {
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUrl as string);
      linkElement.setAttribute('download', 'TopCustomersReport');
      linkElement.click();
    });
  }
  return (
    <Accordion sx={{ backgroundColor: 'rgb(240, 240, 240)' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="id">
        <Typography sx={{ float: 'left' }}>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <Button variant="contained" onClick={downloadRandomReport}>
            Download
          </Button>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
export default function DownloadReport() {
  const Reports = [{ name: 'total sales' }, { name: 'top 5 ' }, { name: 'top 10 selling books ' }];
  const [showReports, setShowReports] = useState<any>();

  useEffect(() => {
    setShowReports(Reports);
  }, []);
  function filterUser(value: string) {
    setShowReports(Reports.filter((report) => report['name'].toLowerCase().includes(value.toLowerCase())));
  }
  return (
    <Grid>
      <Grid>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mt: 10, mx: 50, backgroundColor: 'white', width: '50vw', height: '100%' }}
          margin="normal"
          required
          fullWidth
          id="ReportName"
          label="Report Name"
          onChange={(e) => {
            filterUser(e.currentTarget.value);
          }}
          name="ReportName"
          autoFocus
        />
      </Grid>
      <Grid xs={20} sm={12} sx={{ mx: 50, backgroundColor: 'white', width: '50vw', height: '100%' }} item>
        {showReports?.map((user: any) => (
          <Report name={user['name']} key={user['id']} />
        ))}
      </Grid>
    </Grid>
  );
}
