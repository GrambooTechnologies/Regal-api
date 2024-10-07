const { poolPromise } = require("../config/db");

// Get all products
const getProducts = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(
      `
       SELECT 

    P.ProdCodeId, P.JobOrderId, P.StockDate, P.SupplierId, P.DeptId, P.PurId, P.prodCode, 
    P.GenFrom, P.ItemID, P.PurityId, P.ModelId, P.Nos, P.NetWt, P.Gwt, P.Diawt, P.DiaNo, 
    P.DiaRate, P.DiaCash, P.Stonewt, P.StoneCtWt, P.StRate, P.StoneCash, P.MC, P.Wst, 
    P.IsMRP, P.MRP, P.VA, P.VAPerc, P.MinVA, P.MCPerc, P.WstPerc, P.PurRate, P.PurDiaRate, 
    P.PurStRate, P.PurCost, P.description, P.Company_id, P.Branch_id, P.Counter_id, 
    P.IsActive, P.VAamount, P.VAmode, P.MinimumVAamount, P.Touch, P.RatePerGm, 
    P.MessureID, P.Value, P.Tagwt, P.VchNo, P.VchDate, P.BranchId, P.PartyTypeId, P.PartyId, 
    P.TransTypes, P.selectBranchId, P.ReceiptId, P.DesignId, P.SingleStone, P.StoneId, 
    P.PurVaMode, P.PurVa, P.ProdJobNo, P.HuId, P.LoadTo, P.HUId2, P.NoOfHUId, P.StNo, 
    P.Netwt1, P.Netwt2, P.PurityId2, P.Wax, P.Ot_Stno, P.Ot_Stwt, P.Ot_StRate, P.Ot_StAmt, 
    P.Pr_Stno, P.Pr_Stwt, P.Pr_StRate, P.Pr_StAmt, 
    
    S.SuppId, S.SuppCode, S.SuppName, S.SuppContPerson, S.SuppContPhone, S.SuppTIN, 
    S.SuppCST, S.SuppTypeId, S.SuppGroupId, S.SuppDefltTouch, S.SuppBalanceMode, 
    S.SuppMCmode, S.Company_id AS Supp_Company_id, S.Branch_id AS Supp_Branch_id, 
    S.Counter_id AS Supp_Counter_id, S.IsActive AS Supp_IsActive, S.SuppCIN, S.suppPanNo, 
    S.suppGstNo, S.Acc_LedgerID, S.SuppAddr1, S.SuppAddr2, S.SuppContPhone1, S.StateCode, 
    S.StoneRet, S.Diaret, S.IsGSTRegistred, S.TotalReturn, S.TDS, S.MetalRet, 
    S.CmetalRet, S.Cstoneret, S.Cdiaret, S.Ctotalreturn, S.PurBranchId, S.PanType, 
    S.SuppBranch_Id, S.Code, S.AllBranch, S.SuppPlace, S.SuppPin, S.IndirectTaxType, 
    S.TCS, S.IndirectTaxType_PU, S.TDS_PU, S.TCS_PU, S.RoundTo, S.Old_Acc_LedgerID, 
    S.Old_LedgerName, S.SelectAllTypes, S.RateCuttingModePur, S.StockSalesRate, 
    S.OrderSalesRate, S.BasePurity, S.RateCardId

FROM 
    TEST.STK.ProdCodeMaster P
LEFT JOIN 
    TEST.PUR.SupplierMaster S
ON 
    P.SupplierId = S.SuppId
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

// Get product by ID
const getProductById = async (productId) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("ProductID", productId)
      .query("SELECT * FROM Products WHERE ProductID = @ProductID");
    return result.recordset[0];
  } catch (error) {
    throw new Error("Error fetching product: " + error.message);
  }
};

module.exports = {
  getProducts,
  getProductById,
};
