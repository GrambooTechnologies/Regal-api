const { request } = require("express");
const { poolPromise } = require("../config/db");

// Get all products
const getProducts = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(
      `
       SELECT 
      
    P.StockDate, P.prodCode, 
    P.GenFrom, P.Nos, P.NetWt, P.Gwt, P.Diawt, P.DiaNo, 
    P.DiaRate, P.DiaCash, P.Stonewt, P.StoneCtWt, P.StRate, P.StoneCash, P.MC, P.Wst, 
    P.IsMRP, P.MRP, P.VA, P.VAPerc, P.MinVA, P.MCPerc, P.WstPerc, P.PurRate, P.PurDiaRate, 
    P.PurStRate, P.PurCost, P.description, P.Company_id, P.Branch_id, P.Counter_id, 
    P.IsActive, P.VAamount, P.VAmode, P.MinimumVAamount, P.Touch, P.RatePerGm, 
    P.Value, P.Tagwt, 
    P.StNo, 
    P.Ot_Stno, P.Ot_Stwt, P.Ot_StRate, P.Ot_StAmt, 
    P.Pr_Stno, P.Pr_Stwt, P.Pr_StRate, P.Pr_StAmt, 
    P.Pol_Stwt ,
    P.Pol_Stno ,
    P.Pol_Strate ,
    P.Pol_Stamt ,
    P.UN_Stwt ,
    P.UN_Stno ,
    P.UN_Strate ,
    P.UN_Stamt 
    S.SuppCode, S.SuppName, S.SuppContPerson, S.SuppContPhone, 
    ITM. ItemCode, ITM.ItemName

FROM 
    STK.ProdCodeMaster P
LEFT JOIN 
    PUR.SupplierMaster S
ON 
    P.SupplierId = S.SuppId
LEFT JOIN 
    ITM.ItemMaster ITM
ON 
    P.ItemId = ITM.ItemID
WHERE 
    P.IsActive = 1 
    AND S.IsActive = 1;

`
    );

    return result.recordset;
  } catch (error) {
    console.log("ERROR :", error);
    throw new Error("Error fetching products: " + error.message);
  }
};
// Get stockTranfer
const getstockTranferList = async (Branch_id) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Branch_id", Branch_id)
      .query(
        `Select * from STK.FunTransferInbox('1',${Branch_id},'Pending Transfer','stk') PT
       
    WHERE 
     NOT EXISTS (
        SELECT 1 
        FROM API.branchTranferStatus BTS
        WHERE BTS.TransferId = PT.TransferId 
        AND BTS.TrnsferStastus = 1 )

  

`
      );

    return result.recordset;
  } catch (error) {
    console.log("ERROR :", error);
    throw new Error("Error fetching products: " + error.message);
  }
};

// Get product by ID
const getProductById = async (TransferId) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input("TransferId", TransferId).query(`
        
            SELECT 
        STM.EntryId, STM.VchNo, STM.VoucherTypeId, STM.VchDate, STM.InvNo, STM.InvDate, 
        STM.DeptId, STM.PartyTypeId, STM.PartyId, STM.BillType, STM.MetalRate, 
        STM.TotalChargeAmount, STM.TotalCertificationCharge, STM.FinalAmount, STM.NetTotal, 
        STM.TotalMc, STM.Roundoff, STM.Remarks, STM.TransType, STM.Discount, STM.TaxAmount, 
        STM.TaxPercentage, STM.Amount, STM.TotalPureWt, STM.TotalWastageWt, STM.TotalActualWt, 
        STM.TxType, STM.Company_id, STM.Branch_id, STM.Counter_id, STM.IsActive, STM.PurchaseType, 
        STM.CGSTPerc, STM.TotalCGST, STM.SGSTPerc, STM.TotalSGST, STM.IGSTPerc, STM.TotalIGST, 
        STM.Transportationmode, STM.VehicleNo, STM.DateofSupply, STM.placeofsupply, STM.Purpose, 
        STM.TotalStCash, STM.TotalDiaCash, STM.TDSPerc, STM.TotalTDS, STM.totaladvance, 
        STM.TranferBranchId, STM.OTCharge, STM.TransferId, STM.IsBarcode, STM.STKType, 
        STM.ResultOnly, STM.ItemTotal, STM.ItemTxTypeId, STM.ItemTaxPerc, STM.ItemTaxAmt, 
        STM.EntryMod, STM.EmpId, STM.MC_Mode, STM.MetalRatePurity
        FROM  STK.StockTransferMaster STM
        WHERE STM.EntryId = @TransferId  ;

        
        `);

    const result2 = await pool
      .request()
      .input("TransferId", TransferId)
      .query(
        `SELECT 

          STD.EntryId, STD.TransId, STD.Slno,  STD.Nos, STD.StWt, STD.[Mc Perc], STD.MCRate, STD.[Wst Perc], 
    STD.IsActive, STD.Rate, STD.MetalCash, STD.[Item Name], STD.[Model Name], 
    STD.ItemRemarks, STD.Amount, STD.IsReceipt, STD.BranchName, STD.IssueId, STD.CertificationCharge, 
    STD.SalesVA, STD.PurchaseVA, STD.TotalAmount, STD.WastageWt, STD.ActualWt, STD.JobNo, STD.BatchNo, 
    STD.TestResult, STD.Loss, STD.TransferTransId, STD.TrackingID, STD.DiaLoss, STD.StLoss, STD.[Reference No], STD.IdType, 
    STD.StCtWt, STD.HUId,STD.Purity,
    
    PM.StockDate,PM.ProdCode,PM.Diawt,PM.DiaNo,PM.ItemID,PM.NetWt, PM.SupplierId, PM.DeptId, PM.GenFrom, PM.IsMRP,
    PM.MRP, PM.VA, PM.VAPerc, PM.MinVA, PM.MCPerc,PM.WstPerc, PM.PurRate, PM.PurDiaRate, PM.PurStRate, PM.PurCost, PM.description, PM.Created_by, 
    PM.Created_date, PM.Last_modified_by, PM.Last_modified_date, PM.VAamount, PM.VAmode, PM.MinimumVAamount, 
    PM.Touch, PM.RatePerGm, PM.MessureID, PM.Value, PM.Tagwt, PM.VchNo, PM.VchDate, PM.PartyTypeId, PM.PartyId, 
    PM.TransTypes, PM.selectBranchId, PM.ReceiptId, PM.DesignId, PM.SingleStone, PM.StoneId, PM.PurVaMode, 
    PM.PurVa, PM.ProdJobNo, PM.HuId, PM.LoadTo, PM.HUId2, PM.NoOfHUId, PM.Netwt1, PM.Netwt2, PM.PurityId2, 
    PM.Wax, PM.Ot_Stno, PM.Ot_Stwt, PM.Ot_StRate, PM.Ot_StAmt, PM.Pr_Stno, PM.Pr_Stwt, PM.Pr_StRate, PM.Pr_StAmt,

                IM.ItemCode, IM.ItemName, IM.ItemNamePrint, 

        S.SuppCode, S.SuppName, S.SuppContPerson, S.SuppContPhone
        FROM STK.VGoldStockTransferDetails STD 
        LEFT JOIN ITM.ItemMaster IM ON STD.ItemID = IM.ItemId
        LEFT JOIN STK.ProdCodeMaster PM  ON STD.ProdCodeId = PM.ProdCodeId
        LEFT JOIN PUR.SupplierMaster S  ON PM.SupplierId = S.SuppId
        where EntryId = @TransferId`
      );

    return { master: result.recordset[0], details: result2.recordset };
  } catch (error) {
    throw new Error("Error fetching product: " + error.message);
  }
};

//change transfer Status by ID

const updateStockTransferStatus = async (TransferId) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input("TransferId", TransferId).query(`
        
            INSERT INTO 
              API.branchTranferStatus
              (
                 TransferId, TransferType, TrnsferStastus, 
                 CreatedDate, ModifiedDate, CreatedBy, ModifiedBy
              )
            VALUES
              (
                 @TransferId, 'STK', 0, 
                 getdate(), getdate(), '1', '1'
              );

        
        `);

    return {
      success: true,
      message: "Transfer status updated successfully.",
      transferId: TransferId,
      affectedRows: result.rowsAffected[0],
    };
  } catch (error) {
    throw new Error("Error inserting product: " + error.message);
  }
};

module.exports = {
  getProducts,
  getProductById,
  getstockTranferList,
  updateStockTransferStatus,
};

`
SELECT 
PT.TransferId, 
PT.TransferType, 
PT.VoucherNo, 
PT.VoucherDate, 
PT.MetalType, 
PT.TranferBranchId, 
PT.Remarks, 
PT.Company_Id, 
PT.Branch_Id
FROM `;
