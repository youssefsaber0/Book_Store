import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Grid, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { ReportingEndPoint } from 'Frontend/generated/endpoints';

type userProps = {
  name: string;
};

function Report({ name }: userProps) {
  function downloadReport() {
    switch (name) {
      case 'Book Sales':
        downloadBookSalesReport();
        break;
      case 'Best Sellers':
        downloadBestSellersReport();
        break;
      case 'Top Customers':
        downloadTopCustomersReport();
        break;
      default:
        break;
    }
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
          <Button variant="contained" onClick={downloadReport}>
            Download
          </Button>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default function DownloadReport() {
  const Reports = [{ name: 'Book Sales' }, { name: 'Best Sellers' }, { name: 'Top Customers' }];
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
          <Report name={user['name']} key={user['name']} />
        ))}
      </Grid>
    </Grid>
  );
}
