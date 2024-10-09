const { poolPromise } = require("../config/db");

// Get all products
const getProducts = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(
      `
       SELECT 
        TOP 5
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
    console.log("resultsss", error);
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
        `Select * from STK.FunTransferInbox('1','110','Pending Transfer','stk') PT
       
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
    console.log("resultsss", error);
    throw new Error("Error fetching products: " + error.message);
  }
};

// Get product by ID
const getProductById = async (TransferId) => {
  console.log("tereee", TransferId);

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
        STM.EntryMod, STM.EmpId, STM.MC_Mode, STM.MetalRatePurity,
          
        STD.TransId, STD.Slno, STD.BranchId AS StdBranchId, STD.IssueId, STD.PurId, STD.JobOrderId, 
        STD.ProdCodeId, STD.ItemID, STD.PurityId, STD.NetWt, STD.PureWt, 
        STD.Touch, STD.Nos, STD.Gwt, STD.DiaNo, STD.Diawt, STD.DiaCash, STD.StWt, STD.StCtWt, 
        STD.StCash, STD.MCRate, STD.MCPerc, STD.MC, STD.WstPerc, STD.Wst, STD.DiaRate, STD.StRate, 
        STD.ItemRemarks, STD.MetalCash, STD.Amount AS StdAmount, STD.CertificationCharge, 
        STD.SalesVA, STD.PurchaseVA, STD.TotalAmount AS StdTotalAmount, STD.WastageWt, 
        STD.ActualWt, STD.IsActive AS StdIsActive, STD.IsReceipt, STD.Rate, STD.BatchId, 
        STD.TestResult, STD.Loss, STD.TransferTransId, STD.IssueWt, STD.IssId, STD.RecId, 
        STD.IdType, STD.Mud, STD.Status, STD.TrackingID, STD.DiaLoss, STD.StLoss, STD.HUId,
          
        IM.ItemCode, IM.ItemName, IM.ItemNamePrint, 
        
        PM.prodCode

    FROM TEST.STK.StockTransferMaster STM
    LEFT JOIN STK.StockTransferDetails STD ON STM.EntryId = STD.EntryId
    LEFT JOIN ITM.ItemMaster IM ON STD.ItemID = IM.ItemId
    LEFT JOIN STK.ProdCodeMaster PM ON STD.ProdCodeId = PM.ProdCodeId


WHERE STM.EntryId = @TransferId  ;

        
        `);
    return result.recordset[0];
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
    console.log(result);

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
