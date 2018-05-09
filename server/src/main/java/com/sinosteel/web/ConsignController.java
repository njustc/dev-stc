package com.sinosteel.web;

import com.sinosteel.domain.Consign;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.service.ConsignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author LBW
 */
@RequestMapping(value = "/consign")
@RestController
public class ConsignController extends BaseController
{
    @Autowired
    private ConsignService consignService;

    @RequestMapping(method = RequestMethod.GET)
    public Consign queryConsigns()
    {
        Consign consign = consignService.queryConsigns();

        return consign;
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Void> updateConsigns(@RequestBody Consign consign)
    {

        try {
            consignService.updateConsigns(consign);
            return ResponseEntity.<Void>ok().build();
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return ResponseEntity.<Void>badRequest().build();
        }

    }
    @RequestMapping(value = "/state", method = RequestMethod.GET)
    public String getConsignsState()
    {
        return consignService.getConsignState();
    }

    @RequestMapping(value = "/state/submit", method = RequestMethod.GET)
    public ResponseEntity<Void> submitConsign()
    {
       consignService.submitConsign();
        return ResponseEntity.<Void>ok().build();
    }

    @RequestMapping(value = "/state/pass", method = RequestMethod.GET)
    public ResponseEntity<Void> passConsign()
    {
        consignService.passConsigns();
        return ResponseEntity.<Void>ok().build();
    }
    @RequestMapping(value = "/state/reject", method = RequestMethod.GET)
    public ResponseEntity<Void> rejectConsign()
    {
        consignService.rejectConsign();
        return ResponseEntity.<Void>ok().build();
    }
}
