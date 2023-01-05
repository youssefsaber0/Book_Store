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
import { saveAs } from 'file-saver';

type userProps = {
  name: string;
};
function Report({ name }: userProps) {
  function promote() {
    // TODO
  }

//   function downloadRandomReport() {
//     //url
//     ReportingEndPoint.downloadBookSalesReport().then((response) => {
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
    function downloadBookSalesReport() {
    ReportingEndPoint.downloadBookSalesReport().blob().then((blob) => {
        const file = new Blob([blob], {
          type: 'application/pdf',
        });

        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        saveAs(file, 'BookSalesReport');
    });
  }
      function downloadBestSellersReport() {
      ReportingEndPoint.downloadBestSellersReport().blob().then((blob) => {
          const file = new Blob([blob], {
            type: 'application/pdf',
          });

          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
          saveAs(file, 'BestSellersReport');
      });
    }
        function downloadTopCustomersReport() {
        ReportingEndPoint.downloadTopCustomersReport().blob().then((blob) => {
            const file = new Blob([blob], {
              type: 'application/pdf',
            });

            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            saveAs(file, 'TopCustomersReport');

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
    // change background color with a random color
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
      <Grid xs={20} sm={12} sx={{ mx: 50, backgroundColor: 'white', width: '50vw', height: '100%' }}>
        {showReports?.map((user: any) => (
          <Report name={user['name']} key={user['id']} />
        ))}
      </Grid>
    </Grid>
  );
}
