package com.sinosteel.web;

import com.sinosteel.domain.Entrust;
import com.sinosteel.framework.core.web.ResponseType;
import com.sinosteel.service.EntrustService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author LBW
 */
@RequestMapping(value = "/entrust")
@RestController
public class EntrustController extends BaseController
{
    @Autowired
    private EntrustService entrustService;

    @RequestMapping(method = RequestMethod.GET)
    public Entrust queryEntrusts()
    {
        Entrust entrust = entrustService.queryEntrusts();

        return entrust;
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Void> updateEntrust(@RequestBody Entrust entrust)
    {

        try {
            entrustService.updateEntrusts(entrust);
            return ResponseEntity.<Void>ok().build();
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return ResponseEntity.<Void>badRequest().build();
        }

    }
    @RequestMapping(value = "/state", method = RequestMethod.GET)
    public String getEntrustState()
    {
        return entrustService.getEntrustState();
    }

    @RequestMapping(value = "/state/submit", method = RequestMethod.GET)
    public ResponseEntity<Void> submitEntrust()
    {
        entrustService.submitEntrust();
        return ResponseEntity.<Void>ok().build();
    }

    @RequestMapping(value = "/state/pass", method = RequestMethod.GET)
    public ResponseEntity<Void> passEntrust()
    {
        entrustService.passEntrust();
        return ResponseEntity.<Void>ok().build();
    }
    @RequestMapping(value = "/state/reject", method = RequestMethod.GET)
    public ResponseEntity<Void> rejectEntrust()
    {
        entrustService.rejectEntrust();
        return ResponseEntity.<Void>ok().build();
    }
}
